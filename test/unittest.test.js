const assert = require('assert');
const commandHandler = require('../commandHandler');

describe('Query Free Test', () => {
    var seatTable = {};
    it('should return FREE', () => {
           const output = commandHandler.queryHandler('A0000', seatTable);
           assert.equal(output, "FREE\n");
       });

    it('should still return FREE', () => {
        const output = commandHandler.queryHandler('A0000', seatTable);
        assert.equal(output, "FREE\n");
    });
});

describe('Transaction Test', () => {
    var seatTable = {};
    it('should return FREE', () => {
           const output = commandHandler.queryHandler('A0000', seatTable);
           assert.equal(output, "FREE\n");
       });

    it('should fail on purchase', () => {
        const output = commandHandler.purchaseHandler('A0000', seatTable);
        assert.equal(output, "FAIL\n");
    });
    it('should still return FREE', () => {
        const output = commandHandler.queryHandler('A0000', seatTable);
        assert.equal(output, "FREE\n");
    });

    it('should reserve successfully', () => {
        const output = commandHandler.reservationHandler('A0000', seatTable);
        assert.equal(output, "OK\n");
    });

    it('should be reserved', () => {
        const output = commandHandler.queryHandler('A0000', seatTable);
        assert.equal(output, "RESERVED\n");
    });

    it('should be purchased succesfully', () => {
        const output = commandHandler.purchaseHandler('A0000', seatTable);
        assert.equal(output, "OK\n");
    });

    it('should be sold', () => {
        const output = commandHandler.queryHandler('A0000', seatTable);
        assert.equal(output, "SOLD\n");
    });

    it('should fail on reservation', () => {
        const output = commandHandler.reservationHandler('A0000', seatTable);
        assert.equal(output, "FAIL\n");
    });

    it('should fail on purchase', () => {
        const output = commandHandler.purchaseHandler('A0000', seatTable);
        assert.equal(output, "FAIL\n");
    });
});