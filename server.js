const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI|| "mongodb://localhost/workout",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.use(require('./routes/api'));
app.use(require('./routes/index'));
app.listen(PORT,() =>{
    console.log(`app is running on port${PORT}`);
});