const assert = require('assert');
const net = require('net');
const app = require('../app')

var response;
const client = net.createConnection({ port: 8099 }, () => {
    console.log('connected to server!');
});

client.on('data', (data) => {
    response = data.toString();
});

client.on('end', () => {
    console.log('disconnected from server');
});

describe('Client messaging connection', () => {


    it('query should return FREE', async function(){

        client.write('QUERY: A000\n');
        await new Promise(r => setTimeout(r, 100));            
        assert.equal(response, "FREE\n");

        client.end();
        app.close();

    });
    
});
