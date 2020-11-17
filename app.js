var express = require('express');

var app = express();
var net = require('net');

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
    if (action == "QUERY") {return handleQuery(seat); }
    else if (action == "RESERVE") { return handleReservation(seat); }
    else if (action == "BUY") { return handlePurchase(seat); }
    else
    {
        return "FAIL\n";
    }
}

function handleQuery(seat)
{
    var status = seatTable[seat]
    if (status != null)
    {
        return status + "\n"
    }
    else
    {
        seatTable[seat] = "FREE"
        return "FREE\n";
    }
}

function handleReservation(seat)
{
    var status = seatTable[seat]
    if (status != null)
    {
        if (status == "FREE")
        {
            seatTable[seat] = "RESERVED"
            return "OK\n";
        }
        else 
        {
            return "FAIL\n";
        }
    }
    else
    {
        return "FAIL\n";
    }
}

function handlePurchase(seat)
{
    var status = seatTable[seat]
    if (status != null)
    {
        if (status == "RESERVED")
        {
            seatTable[seat] = "SOLD"
            return "OK\n";
        }
        else 
        {
            return "FAIL\n";
        }
    }
    else
    {
        return "FAIL\n";
    }
}
module.exports = app;
