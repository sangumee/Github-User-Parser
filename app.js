/* If you want to save data into MySQL DB you should enter your MySQL Information in ./lib/db.js */
const request = require("request");
const shortid = require("shortid");
// const db = require("./lib/db"); // MUST Enter data First!!!

/* Github Personal Access Token */
/* You Can get it one in "https://github.com/settings/tokens" or you can only request 60 API calls in 1 hour */
/* if you have some problems with this Issued me in Github or read README.md file!! */
const accessToken = '';

let userId;
/* Timer Function to avoid API Limit */
function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

/* Parser Function */
async function load() {
    for (let i = 0; i < 100000; i++) {
        await timer(1000); // You should change this number If there is error with MySQL
        let getDataOption = {
            url: `https://api.github.com/users?access_token=${accessToken}&since=${i}&per_page=1`,
            headers: {
                "User-Agent": "request"
            }
        };
        console.log(getDataOption.url);
        request(getDataOption, function (err, res, profile) { // GET user Information with API
            let data = JSON.parse(profile);
            console.log(data[0].login); // Parsing ID Output
            /* If you want to check all the information of JSON file console.log(profile); */
            // console.log(profile);
            if (userId === data[0].login) {
                console.log(`Same User in ${i}`);
            } else {
                console.log(`Different User in ${i}`);
                userId = data[0].login;
                if (err) {
                    console.log(err);
                }
                /* Import to MySQL DB Process,
                in this case I only parse 4 data of them
                Above code is example of the data
                */
                // db.query(
                //     `INSERT INTO user (loginId, displayId, avatarUrl, name, bio, registerType) VALUES (?, ?, ?, ?, ?, ?)`,
                //     [
                //         data[0].login,
                //         data[0].id,
                //         data[0].avatar_url,
                //         data[0].login,
                //         "Developer",
                //         "Unregistered"
                //     ]
                // );

                /* Github Repository Parsing Process */
                let githubAPI = "https://api.github.com/users/";
                let repositoryOptions = {
                    url: githubAPI +
                        userId + // userId
                        `/repos?access_token=${accessToken}&&per_page=100`,
                    headers: {
                        "User-Agent": "request"
                    }
                };
                request(repositoryOptions, function (error, response, data) {
                    if (error) {
                        console.log(error);
                    }
                    let result = JSON.parse(data);
                    /* To check data field console.log it */
                    // console.log(result);
                    for (i = 0; i < result.length; i++) {
                        let sid = shortid.generate();
                        let userId = result[i].owner.login;
                        let projectName = result[i].name;
                        let githubUrl = result[i].html_url;
                        let summary = result[i].description;
                        let keyword = `{"language" : "${result[i].language}"}`;
                        let projectDate1 = result[i].created_at;
                        let projectDate2 = result[i].updated_at;
                        let sqlData = [
                            sid,
                            userId,
                            projectName,
                            githubUrl,
                            summary,
                            keyword,
                            projectDate1,
                            projectDate2
                        ];
                        console.log(sqlData);
                        /* You have to choose the data field you want. */
                        // let sql = `INSERT INTO project (sid, userId, projectName, githubUrl, summary, keyword, projectDate1, projectDate2) VALUES (?,?,?,?,?,?,?,?)`; // PUT All Data to DB
                        // db.query(sql, sqlData);
                    }
                });
            }
        });
    }
    // await timer(2000);
}

load(); // RUN