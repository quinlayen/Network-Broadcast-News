const net = require('net');
const PORT = 6969;
const clientList = [];
const userNames = [];
const server = net.createServer(client => {
  clientList.push(client);
  //creates usernames from the clientList
  clientList.map(element => {
    userNames.push(`User ${clientList.indexOf(element)}`);
  });
  client.on('data', data => {
    let firstChar = data.toString().charAt(0);
    switch (firstChar) {
      case '@':
        client.write(`Welcome ${data.toString().substr(1).trim()}`);
        userNames.push(data.toString());
        broadcast(client, `${data.toString().substr(1).trim()} has joined the server`);
        break;
      default:
        broadcast(client, data.toString());
    }
  });
  //sends a welcome to newly logged in clients
  const welcome = `Hello. Please enter a username.\nUse a '@' before your name i.e. @username`;
  client.write(welcome);

  //broadcasts messages to all other users
  const broadcast = (sender, message) => {
    clientList.forEach(clientName => {
      if (clientName !== sender) {
        clientName.write(message);
      }
    });
  };

  client.on('end', () => {
    clientList.splice(clientList.indexOf(client), 1);
    userNames.splice(userNames.indexOf(client), 1)
    //broadcast(client, )

    //console.log(clientList);
  });
});

server.on('error', err => {
  throw err;
});
server.listen(PORT, () => {});
