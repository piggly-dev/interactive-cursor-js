const express = require('express');

const app = express();
app.use(express.static(__dirname)).listen(process.env.PORT || 3000);
console.log(`Server is listen on ${process.env.PORT || 3000}`);
