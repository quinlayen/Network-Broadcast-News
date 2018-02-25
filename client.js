const net = require('net');
const server = net.createConnection(6969, '10.0.1.112', () => {
 
  process.stdin.on('data', data => {
    console.log(data.toString())
})
process.stdout.on('data', data =>{
    server.write(data);
})
  server.on('data', data => {
    console.log(data.toString());
  });
});
