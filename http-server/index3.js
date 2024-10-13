
const express = require("express");
const path = require("path");
const minimist = require("minimist");
const fs = require("fs");

// Initialize the app
const app = express();

// Parse command-line arguments
// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

// Serve static files from the current directory
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname)));

// Route to serve the home page
app.get('/', (req, res) => {
    fs.readFile("home.html", (err, home) => {
        if (err) {
            return res.status(500).send("Error reading home.html");
        }
        res.send(home.toString());
    });
});

// Route to serve the project page
app.get('/project', (req, res) => {
    fs.readFile("project.html", (err, project) => {
        if (err) {
            return res.status(500).send("Error reading project.html");
        }
        res.send(project.toString());
    });
});

// Route to serve the registration form
app.get('/registrationform', (req, res) => {
    fs.readFile("registration.html", (err, regForm) => {
        if (err) {
            return res.status(500).send("Error reading registration.html");
        }
        res.send(regForm.toString());
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
