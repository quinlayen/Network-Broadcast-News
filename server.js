const net = require('net');
const PORT = 6969;
let clientList = [];

const server = net.createServer(client => {
  //const name = client;
  //console.log(name)
  clientList.push(client);
  console.log(`${clientList} is connected`);

  client.on('data', data => {
    //console.log(data.toString());
    broadcast(client, data.toString());
  });
  //sends a welcome to newly logged in clients
  //const welcome = `Hello ${name}. Welcome to this amazing Chat Server\n`;
  //client.write(welcome);

  let broadcast = (sender, message) => {
    clientList.forEach(clientName => {
        if(clientName !== sender){
      clientName.write(message);
        }
    });
  };


  client.on('end', () => {
    console.log('client disconnected');
  });
});

server.on('error', err => {
  throw err;
});
server.listen(PORT, () => {});
