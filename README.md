# Github-User-Repository-Parser

[![Build Status](https://travis-ci.org/sangumee/Github-User-Parser.svg?branch=master)](https://travis-ci.org/sangumee/Github-User-Parser) ![](https://img.shields.io/badge/Code%20Statue-Close-red.svg) ![npm](https://img.shields.io/npm/dt/github-user-repository-parser)

Github User Information & Repository Parser with Node.js
It also have save to MySQL DB function.

## Introduction

Github User Information & Repository Parser with Node.js with Save to MySQL DB

[Working Video]

[![](http://img.youtube.com/vi/L0hq0gtrvYo/0.jpg)](http://www.youtube.com/watch?v=L0hq0gtrvYo)

## Run & Install

This program was tested on Node.js LTS. You need the Node.js LTS version to run this program.

## 👨‍💻FINISHED👨‍💻

✅ Parsing user information and each user's repositories  
✅ Upload parsed data to MySQL (Optional /lib/db.js)

## Installation

If you want to store data in the MySQL database, you must check the annotated code and create the column in the MySQL database. If you have any problems, please let us know via the Github Issue tab.

The tested version is shown below and is developed based on the LTS version of Node.js.

If you download and use the program directly in your local environment, you can run the program through the following command: However, this program is also uploaded to NPM, so it is recommended to use NPM.

[Use NPM]

```
npm install github-user-repository-parser
```

and then start with this command

```
node app.js
```

[Local Environment]

```
npm install
```

with installing modules.

After Installing process you can run this web app with this command.

```
node app.js
```

If you want to save data into MySQL, You need to enter your MySQL Information in ./lib/db.js

## Built With

- [Node.js](https://nodejs.org)

## Contact

If you have some questions or issues about this repository please contact me with the Issue section.
