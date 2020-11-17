# Github-User-Repository-Parser-MongoDB

![Build Status](https://travis-ci.org/writingdeveloper/Github-User-Repository-Parser.svg?branch=master) ![](https://img.shields.io/badge/Develoment-Close-red.svg) ![npm](https://img.shields.io/npm/dt/github-user-repository-parser)

## Introduction

Github User Information & Repository Parser and automatically save it to MongoDB Database.

[Demo Video]

Click Image to play it

[![](http://img.youtube.com/vi/L0hq0gtrvYo/0.jpg)](http://www.youtube.com/watch?v=L0hq0gtrvYo)

## Run & Install

This program was tested on Node.js LTS. You need the Node.js LTS version to run this program.

## 👨‍💻FINISHED👨‍💻

✅ Parsing user information and each user's repositories  
✅ Upload parsed data to MongoDB (Optional .env)  
✅ When it stopped and run app again, it gets last parse number so you can parse continually.

## Installation

1. You should create two collections (users, repos) in your MongoDB Database.

2. Download package from Github or NPM

3. Fix the .env file to use Environment variables.

4. Open any terminal and run ```node app.js```

## Using with PM2 (Preferred)  

1. Install PM2 Package globally with this command. 
```
npm install -g pm2
```

2. Access to app folder and use this command.
```
pm2 start app.js --watch
```

3. You can check the log from this command.
```
pm2 monit
```

Using with pm2 it's really usefull that you can close the terminal.

## Contact

If you have any problems, please let us know via the [Github Issue](https://github.com/writingdeveloper/Github-User-Repository-Parser-MongoDB/issues) tab.


## Built With
- [Node.js](https://nodejs.org)
- [Mongoose.js](https://mongoosejs.com)
