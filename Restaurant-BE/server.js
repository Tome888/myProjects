const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();

app.use(express.json());
app.use(cors());

const dbPath = "db.json";

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["api-key"];
  if (apiKey === "86dg6qwd6g7878g0D68G97y9SF8Y9-sfgy8AD") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
};

app.post("/signIn", apiKeyMiddleware, (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ message: "Error parsing JSON" });
    }

    const user = users.admin;

    if (user.username === username && user.password === password) {
      const token = jwt.sign(
        { username: user.username },
        "9huais89hafnuaf89j",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

app.post("/validateToken", apiKeyMiddleware, (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  jwt.verify(token, "9huais89hafnuaf89j", (err) => {
    if (err) {
      return res.status(401).json({ valid: false, message: "Invalid token" });
    }

    res.status(200).json({ valid: true, message: "Valid token" });
  });
});

app.get("/restaurants", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    const jsonData = JSON.parse(data);
    res.send({ mess: "succ", restu: jsonData });
  });
});

app.put("/restaurantsPut/:id", (req, res) => {
  const restaurantId = req.params.id;
  const reviewData = req.body;

  if (!reviewData || typeof reviewData !== "object") {
    return res.status(400).json({ message: "Invalid review data" });
  }

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ message: "Error parsing JSON" });
    }

    const restaurant = jsonData.restaurants.find(
      (rest) => rest.id === restaurantId
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.reviewsList.push(reviewData);

    restaurant.reviews = restaurant.reviewsList.length;

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      res
        .status(200)
        .json({ message: "Review added successfully", restaurant });
    });
  });
});
app.put("/updateRes/:id", apiKeyMiddleware, (req, res) => {
  const restaurantId = req.params.id;
  const updatedData = req.body;

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "9huais89hafnuaf89j", (err) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!updatedData || typeof updatedData !== "object") {
      return res.status(400).json({ message: "Invalid restaurant data" });
    }

    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ message: "Error parsing JSON" });
      }

      const restaurant = jsonData.restaurants.find(
        (rest) => rest.id === restaurantId
      );

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      Object.assign(restaurant, updatedData);

      fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({
          message: "Restaurant updated successfully",
          restaurant,
        });
      });
    });
  });
});

app.delete("/deleteRest/:id", apiKeyMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "9huais89hafnuaf89j", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const restaurantId = req.params.id;

    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ message: "Error parsing JSON" });
      }

      const restaurantIndex = jsonData.restaurants.findIndex(
        (rest) => rest.id === restaurantId
      );

      if (restaurantIndex === -1) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      jsonData.restaurants.splice(restaurantIndex, 1);

      fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
      });
    });
  });
});

app.post("/addRest", apiKeyMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "9huais89hafnuaf89j", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const newRestaurant = { ...req.body, reviews: 0, id: uuidv4() };

    const requiredFields = [
      "phone",
      "image",
      "restauranttype",
      "businessname",
      "address",
      "slug",
      "email",
      "reviewsList",
    ];

    for (const field of requiredFields) {
      if (!newRestaurant[field]) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }

    if (newRestaurant.parkinglot === undefined) {
      return res
        .status(400)
        .json({ message: "Missing required field: parkinglot" });
    }

    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return res.status(500).json({ message: "Error parsing JSON" });
      }

      jsonData.restaurants.push(newRestaurant);

      fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(201).json({
          message: "Restaurant added successfully",
          restaurant: newRestaurant,
        });
      });
    });
  });
});

app.listen(5000, () => {
  console.log("server runing on port 5000");
});
