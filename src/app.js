const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const veiwPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", veiwPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Yahya Ihab",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Yahya Ihab",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Yahya Ihab",
        helpText: "This paragraph is in the help page to help you understand.",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide address."
        })
    }
    geocode(req.query.address, (err, {lat, long, location} = {}) => {
        if (err) {
            return res.send({
                err
            })
        }
        forecast(lat, long, (err, forecastData) => {
            if (err) {
                return res.send({
                    err
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Help",
        name: "Yahya Ihab",
        error: "Help page not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Yahya Ihab",
        error: "404 Page not found.",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
