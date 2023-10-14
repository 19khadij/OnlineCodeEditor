const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }

const cors = require('cors');
app.use(cors());


//initialize compiler variable
compiler.init(options)

app.use(bodyP.json());


//we are using local file thats why we use this line
app.use("/codemirror", express.static("C:/Users/FAST COMPUTER 1999/Documents/Sync Internship/code/OnlineCodeEditor/codemirror"))

//index.html hosting through api

app.get("/", function (req, res) {
    res.sendFile("C:/Users/FAST COMPUTER 1999/Documents/Sync Internship/code/OnlineCodeEditor/index.html")
})
//creating end point
// Change this line from app.get to app.post
app.post("/compile", function (req, res) {
    // API request code is called
    var code = req.body.code;
    var input = req.body.input;
    var language = req.body.language;
    console.log("Received input:", input); // Log the input to check if it's received correctly

    try {
        if (language == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        }
    } catch (e) {
        console.log("Error");
    }
});


app.listen(5000)