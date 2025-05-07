// Step 1: Load the required modules
const http = require('http');  // This is the module for creating the server
const fs = require('fs');  // This module helps us read files (like HTML files)

// Step 2: Create the server
const server = http.createServer((req, res) => {
  // Get the URL of the request
  const url = req.url;

  // Step 3: Check the URL and send the appropriate response
  if (url === '/') {
    // If the user visits the homepage
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading the file!');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data); // Send the content of the index.html file
      }
    });
  } else if (url === '/about') {
    // If the user visits the about page
    fs.readFile('about.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading the file!');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data); // Send the content of the about.html file
      }
    });
  } else if (url === '/contact') {
    // If the user visits the contact page
    fs.readFile('contact.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading the file!');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data); // Send the content of the contact.html file
      }
    });
  } else {
    // If the URL doesn't match any of the above
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid Request!');
  }
});

//my port 5000 is occupied so I use port 3000 instead
server.listen(3000, () => {
  console.log('The NodeJS server on port 3000 is now running….');
});