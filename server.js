const net = require('net');
const PORT = 6969;
const server = net.createServer(client => {
  console.log('client connected');
  client.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('error', err => {
  throw err;
});
server.listen(PORT, () => {
  console.log(`You are connected on port: ${PORT}`);
});
