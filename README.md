# API REST using Node.js, TypeScript, ExpressJs, and MongoDB

This project is a practice to use these technologies.

[Postman documentation](https://documenter.getpostman.com/view/1902911/SztG25gS?version=latest#5806e93d-a3fc-4d9f-85e3-6c8e397f15e9)

## Requirements

NodeJs: 12.16.2 or greater

## Installation

npm install

## Setup

1. First, we have to add the environment variables and there are two ways:
    - If you're a developer you should create a .env based on .env.example file and fill out the properties on it.
    - If you're deploying a server, I strongest recommend set the environment variables on the server instead of using the file.

    Property       | Description
    ---------      |------------
    NODE_ENV       |Environment where is running (develop, qa, production)
    PORT           |Port where is going to start the server
    PATH_HTTP_CERT |Path where are the SSL certificates
    MONGO_DB_URL   |URL to connect to mongodb, this must have a user and password in the URL

1. Second, you have to run the server
    - If you're a developer testing you can use `npm run dev`
    - If you're running in a server `npm start`
