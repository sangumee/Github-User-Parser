require('dotenv').config()
const request = require("request");
const db = require('./lib/db')
const User = require('./lib/models/userModel');
const Repo = require('./lib/models/repoModel');

let userId;

/* Timer Function */
function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function parse() {
    try {
        let lastNumber = await User.aggregate(
            [{
                $group: {
                    _id: null,
                    id: {
                        $max: "$id"
                    }
                }
            }]
        ).exec()
        if (lastNumber.length == 0) {   // Start 0
            lastNumber = 0
        } else {
            console.log(`Last Saved User Number : ${lastNumber[0].id}`)
            for (let i = lastNumber[0].id;; i++) {  // Unlimited
                await timer(5000);  // You can control the speed of parse but, less then 2000 can got limit from github
                let getDataOption = {
                    url: `https://api.github.com/users?since=${i}&per_page=1`,
                    headers: {
                        "User-Agent": "request",
                        'accept': 'application/vnd.github.VERSION.raw',
                        "Authorization": `token ${process.env.GITHUB_DATA_ACCESS_TOKEN}`,
                        'charset': 'UTF-8'
                    },
                    json: true
                };
                request(getDataOption, function (err, res, profile) {
                    // console.log(profile)
                    if (userId === profile[0].login) {
                        console.log(`Same User in ${i}`);
                    } else {
                        let userDataOption = {
                            url: `https://api.github.com/users/${profile[0].login}`,
                            headers: {
                                'User-Agent': 'request',
                                'accept': 'application/vnd.github.VERSION.raw',
                                "Authorization": `token ${process.env.GITHUB_DATA_ACCESS_TOKEN}`,
                                'charset': 'UTF-8'
                            },
                            json: true
                        }
                        console.log(`Different User in ${i}`);
                        userId = profile[0].login;
                        console.log(profile[0].login)
                        request(userDataOption, function (err, res, userData) {
                            if (err) console.log(err)
                            User.create(userData, function (err, result) {
                                if (err) console.log(err);
                            });
                        })
                        let repositoryOptions = {
                            url: `https://api.github.com/users/${userId}/repos?per_page=100`,
                            headers: {
                                'User-Agent': 'request',
                                'accept': 'application/vnd.github.VERSION.raw',
                                "Authorization": `token ${process.env.GITHUB_DATA_ACCESS_TOKEN}`,
                                'charset': 'UTF-8'
                            },
                            json: true
                        }
                        request(repositoryOptions, function (err, res, repoData) {
                            if (err) console.log(err);
                            if (!repoData.length == 0 || repoData.fork == false) {
                                Repo.insertMany(repoData, function (err, result) {
                                    if (err) throw err;
                                })
                            }
                        })
                        if (err) {
                            console.log(err);
                        }
                    }
                })
            }
        }
    } catch (err) {
        throw err;
    }
}

parse();    // Run App