PLEASE READ!

1. To start the project, you'll need to first start the backend server.
      The Backend is located in the folder (App-Backend); there you'll find a db.json and a server.js file, you will need to start both.
      Steps:
      a. db.json (open in integrated terminal > paste this: "json-server --watch db.json --port 5000").
      b. server.js (open in integrated terminal > paste this: "node server.js").

After all that, you can start the frontend, that's located in the (FINAL project) folder.

Steps: (open in integrated terminal my-next-app > paste this > "npm i" > "npm run dev").

2. I wanted to try and create a backend with a database for the website, so I've integrated features to the website that were not required, like:
      a. SUB form in the footer that allows you to send your email, and the backend saves it to the db.
      b. Sign In/Log in, when you register and log in, the backend generates an auth token that allows you access to the user Dashboard.
      c. When you have logged in and have an auth token, you can edit the info about the user in the settings popup.
      d. I've also added commenting for the logged users. When a user comments on a blog, the backend saves it accordingly to the blog ID in the db, so it shows correlating comments only.
3. Also, I've added two languages to the website MK & EN. You can toggle the language from the nav-bar.

==TO LOG IN TO THE DASHBOARD==
You can either create a user account, or you can log in with one of these users

## USER 1

email: user1@mail.com
pass: 123123123

## USER 2

email: user2@mail.com
pass: 123123123
