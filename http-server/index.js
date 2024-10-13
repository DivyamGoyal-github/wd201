const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
let homeContent = "";
let projectContent = "";
let registrationformContent = "";

// eslint-disable-next-line no-undef
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, regForm) => {
  if (err) {
    throw err;
  }
  registrationformContent = regForm;
});


fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registrationform":
        response.write(registrationformContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  }).listen(port);