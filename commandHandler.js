const commandHandler = {};
commandHandler.queryHandler = function handleConnection(seat, seatTable) {    
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
};


commandHandler.reservationHandler = function handleReservation(seat, seatTable)
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

commandHandler.purchaseHandler = function handlePurchase(seat, seatTable)
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

module.exports = commandHandler;