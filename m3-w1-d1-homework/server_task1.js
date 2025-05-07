//Load 'http'
const http = require('http');

//use http model
const server = http.createServer((req, res) => {

  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set header
    res.end('Home Page.'); // Send response text
  } else if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page.');
  } else if (url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contact Page.');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Invalid Request!');
  }
});

//my port 5000 is occupied so I use port 3000 instead
server.listen(3000, () => {
  console.log('The NodeJS server on port 3000 is now running…');
});
