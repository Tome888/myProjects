const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

const readDB = (filename) => {
  const filePath = path.join(__dirname, "db.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(data);
    return parsedData[filename] || [];
  } catch (error) {
    console.error("Error reading or parsing db.json:", error);
    throw new Error("Database read error");
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
};

app.post("/api/user", async (req, res) => {
  const { name, email, password, profession, lastName } = req.body;

  if (!name || !email || !password || !profession || !lastName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      profession,
      lastName,
    };

    const dbPath = path.join(__dirname, "db.json");
    const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    dbContent.users = dbContent.users || [];
    dbContent.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/userData", async (req, res) => {
  const { email, id } = req.query;

  if (!email && !id) {
    return res.status(400).json({ error: "Email or ID is required" });
  }

  try {
    const dbPath = path.join(__dirname, "db.json");
    const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const users = dbContent.users || [];

    const user = users.find((u) => u.email === email || u.id === id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (err) {
    console.error("Error reading users from db.json:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/userData", authenticateToken, (req, res) => {
  const { id } = req.user;
  const { name, email: newEmail, password, profession, lastName } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID not found in token" });
  }

  try {
    const dbPath = path.join(__dirname, "db.json");
    const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const users = dbContent.users || [];

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: newEmail || users[userIndex].email,
      password: password
        ? bcrypt.hashSync(password, 10)
        : users[userIndex].password,
      profession: profession || users[userIndex].profession,
      lastName: lastName || users[userIndex].lastName,
    };

    users[userIndex] = updatedUser;

    fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));

    res.json({ message: "User info updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const users = readDB("users");
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/events");
    const events = response.data;
    console.log("Events data:", events);
    const { id, title, category, limit } = req.query;
    console.log(
      "Search query - ID:",
      id,
      "Title:",
      title,
      "Category:",
      category,
      "Limit:",
      limit
    );

    if (!Array.isArray(events)) {
      console.error("Events data is not an array");
      return res.status(500).json({ error: "Events data format is incorrect" });
    }

    let filteredEvents = events;

    if (id) {
      if (typeof id !== "string") {
        console.error("Search ID is not a string");
        return res.status(400).json({ error: "Invalid search ID" });
      }

      filteredEvents = filteredEvents.filter((e) => e.id === id);
    }

    if (title) {
      if (typeof title !== "string") {
        console.error("Search title is not a string");
        return res.status(400).json({ error: "Invalid search title" });
      }

      filteredEvents = filteredEvents.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (category) {
      if (typeof category !== "string") {
        console.error("Search category is not a string");
        return res.status(400).json({ error: "Invalid search category" });
      }

      filteredEvents = filteredEvents.filter((e) =>
        e.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (isNaN(numLimit) || numLimit <= 0) {
        console.error("Invalid limit parameter");
        return res.status(400).json({ error: "Invalid limit parameter" });
      }

      filteredEvents = filteredEvents.slice(0, numLimit);
    }

    res.json(filteredEvents);
  } catch (error) {
    console.error("Error handling /api/events request:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const response = await axios.post("http://localhost:5000/subscribe", {
      email,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/blogs");
    const blogs = response.data;
    console.log("Blogs data:", blogs);
    const { id, title, category, limit } = req.query;
    console.log(
      "Search query - ID:",
      id,
      "Title:",
      title,
      "Category:",
      category,
      "Limit:",
      limit
    );

    if (!Array.isArray(blogs)) {
      console.error("Blogs data is not an array");
      return res.status(500).json({ error: "Blogs data format is incorrect" });
    }

    let filteredBlogs = blogs;

    if (id) {
      if (typeof id !== "string") {
        console.error("Search ID is not a string");
        return res.status(400).json({ error: "Invalid search ID" });
      }

      filteredBlogs = filteredBlogs.filter((b) => b.id === id);
    }

    if (title) {
      if (typeof title !== "string") {
        console.error("Search title is not a string");
        return res.status(400).json({ error: "Invalid search title" });
      }

      filteredBlogs = filteredBlogs.filter((b) =>
        b.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (category) {
      if (typeof category !== "string") {
        console.error("Search category is not a string");
        return res.status(400).json({ error: "Invalid search category" });
      }

      filteredBlogs = filteredBlogs.filter((b) =>
        b.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (isNaN(numLimit) || numLimit <= 0) {
        console.error("Invalid limit parameter");
        return res.status(400).json({ error: "Invalid limit parameter" });
      }

      filteredBlogs = filteredBlogs.slice(0, numLimit);
    }

    res.json(filteredBlogs);
  } catch (error) {
    console.error("Error handling /api/blogs request:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.get("/api/teamComp", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/teamComp");
    const teamComp = response.data;
    console.log("TeamComp data:", teamComp);

    const { _id, limit } = req.query;
    console.log("Search query - ID:", _id, "Limit:", limit);

    if (!Array.isArray(teamComp)) {
      console.error("TeamComp data is not an array");
      return res
        .status(500)
        .json({ error: "TeamComp data format is incorrect" });
    }

    let filteredTeamComp = teamComp;

    if (_id) {
      if (typeof _id !== "string") {
        console.error("Search ID is not a string");
        return res.status(400).json({ error: "Invalid search ID" });
      }

      filteredTeamComp = filteredTeamComp.filter((t) => t._id === _id);
    }

    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (isNaN(numLimit) || numLimit <= 0) {
        console.error("Invalid limit parameter");
        return res.status(400).json({ error: "Invalid limit parameter" });
      }

      filteredTeamComp = filteredTeamComp.slice(0, numLimit);
    }

    res.json(filteredTeamComp);
  } catch (error) {
    console.error("Error handling /api/teamComp request:", error);
    res.status(500).json({ error: "Failed to fetch team components" });
  }
});

app.get("/api/commentsBlog", (req, res) => {
  try {
    const dbPath = path.join(__dirname, "db.json");
    const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const commentsBlog = dbContent.commentsBlog || [];
    console.log("CommentsBlog data:", commentsBlog);

    const { blogId, limit } = req.query;
    console.log("Search query - BlogID:", blogId, "Limit:", limit);

    if (!Array.isArray(commentsBlog)) {
      console.error("CommentsBlog data is not an array");
      return res
        .status(500)
        .json({ error: "CommentsBlog data format is incorrect" });
    }

    let filteredCommentsBlog = commentsBlog;

    if (blogId) {
      if (typeof blogId !== "string") {
        console.error("Search BlogID is not a string");
        return res.status(400).json({ error: "Invalid search BlogID" });
      }

      filteredCommentsBlog = filteredCommentsBlog.filter(
        (c) => c.blogId === blogId
      );
    }

    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (isNaN(numLimit) || numLimit <= 0) {
        console.error("Invalid limit parameter");
        return res.status(400).json({ error: "Invalid limit parameter" });
      }

      filteredCommentsBlog = filteredCommentsBlog.slice(0, numLimit);
    }

    res.json(filteredCommentsBlog);
  } catch (error) {
    console.error("Error handling /api/commentsBlog request:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

app.post("/api/commentsBlog", authenticateToken, (req, res) => {
  const { name, lastName, comment, date, hour, blogId, likesCount } = req.body;

  if (!name || !lastName || !comment || !date || !hour || !blogId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const dbPath = path.join(__dirname, "db.json");
    const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const newComment = {
      id: uuidv4(),
      name,
      lastName,
      comment,
      date,
      hour,
      blogId,
      likesCount: likesCount || 0,
    };

    dbContent.commentsBlog = dbContent.commentsBlog || [];

    dbContent.commentsBlog.push(newComment);

    fs.writeFileSync(dbPath, JSON.stringify(dbContent, null, 2));

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/changeUserInfo", authenticateToken, (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
