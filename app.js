var express = require('express');

var app = express();
var net = require('net');

const commandHandler = require('./commandHandler');

var server = net.createServer();
server.on('connection', handleConnection);

var seatTable;
server.listen(8099, function()
{
    seatTable = {};
});

function handleConnection(conn) {    

    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  

    conn.on('data', onConnData);  
    conn.once('close', onConnClose);  
    conn.on('error', onConnError);

    function onConnData(data) { 
        var command = data.toString(); 

        var result = command.split(": ");
        var action = result[0];
        var seat = result[1];

        conn.write(handleRequest(action, seat));
    }
    function onConnClose() {  
      console.log('connection from %s closed', remoteAddress);
    }
    function onConnError(err) {  
      console.log('Connection %s error: %s', remoteAddress, err.message);  
    }  
}

function handleRequest(action, seat)
{
    if (action == "QUERY") {return commandHandler.queryHandler(seat, seatTable); }
    else if (action == "RESERVE") { return commandHandler.reservationHandler(seat, seatTable); }
    else if (action == "BUY") { return commandHandler.purchaseHandler(seat, seatTable); }
    else
    {
        return "FAIL\n";
    }
}
module.exports = server;
