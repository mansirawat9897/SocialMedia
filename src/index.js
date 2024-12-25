import express from "express";
import morgan from "morgan";
// Create a new express app/server object
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

function commonMiddeleware(req, res, next) {
    console.log("commonmiddleware");
    next()
}
app.use(morgan('combined'));

function mid1(req, res, next) {
    console.log("mid1");
    next();
}

function mid2(req, res, next) {
    console.log("mid2");
    next();
}

function mid3(req, res, next) {
    console.log("mid3");
    next();
}
const middleware = [mid1, mid2, mid3];
// what to do if someone makes a GET request to /ping
app.get('/ping', middleware, (req, res) => {
    return res.json({
        message: 'ping'
    })
})

app.post('/hello', middleware, (req, res) => {
    console.log("body", req.body)
    return res.json({
        message: 'ping'
    })
})
app.get('/tweets/:tweet_id/comments/:comment_id', (req, res) => {
    console.log(req.params)
    return res.json({
        message: 'tweet details'
    })
})
// Define a PORT and attach it to the express app
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})