const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 3000;
let host = process.env.HOST;





const app = express();


app.listen(port, host, () => {
    console.log(`Server is listening ${host}:${port}`);
    console.log(process.env.TOKEN_KEY);
  });