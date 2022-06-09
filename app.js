const express = require('express');
const app = express();
const userRouter = require('./routes/user'); // adding user apis
const checkRouter = require('./routes/check');
const reportRouter = require('./routes/report');
const config = require('config');
const cookieParser = require('cookie-parser');
const swaggerUI = require("swagger-ui-express");
const {swaggerConfig} = require('./config/swaggerConfig');
require("./db/db"); // importing DB


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR WITH jwtPrivateKey');
    process.exit(1);
};


app.use(cookieParser());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use('/api/users', userRouter);
app.use('/api/checks', checkRouter);
app.use('/api/reports', reportRouter);


app.get('/', (req, res) => {
    res.send('Hello to Bosta Assessment');
});

console.log(`Application name: ${config.get('name')}`);

//setting port value as environment variable of port if exists or else 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}..`)
});