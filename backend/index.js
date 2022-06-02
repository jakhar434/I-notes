const ConnectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
ConnectToMongo();
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json());
// use of router 
app.use('/api/auth', require("./Routes/auth"));
app.use('/api/notes', require("./Routes/notes"));

app.listen(port, () => {
    console.log(`connected to port ${port}`);
});