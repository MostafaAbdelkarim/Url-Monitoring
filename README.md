![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Basic Overview

Backend API based on Nodejs, Express and MongoDB for managing Urls and generating health stats reports for each Url created by users.

## Tech Stack

- Nodejs
- Express
- Joi
- JsonWebToken
- Mongoose
- Nodemailer
- Swagger-Ui-Express
- Jest

## Dependencies

You can find all dependencies in `package.json` file.

## How to use

- Clone the repo.
- Open cmd/terminal in Directory file and rune `npm install`.
- Before starting, you need to export/set these environment variable to values of your own. The variables are: `bosta_jwtPrivateKey`, `userMailEnv` and `userPassEnv`.
- To test app before running run `npm test` in CMD/Terminal.
- Using the CMD/Terminal run `nodemon app.js` to keep app running.
- You can start experimenting using this link: `http://localhost:3000/`

- For API documentation, you can navigate to `https://localhost:3000/api-docs`.

### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/MostafaAbdelkarim/Url-Monitoring/issues) to report any bugs or file feature requests.
