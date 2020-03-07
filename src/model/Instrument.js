const db = require('../DB/mockDB').getInstance();


function Instrument({instrumentId, name, symbol,instrumentType})  {
    this.instrumentId =  instrumentId ? instrumentId: (new Date().getTime() +  db.createId());
    this.name = name; 
    this.symbol = symbol;
    this.instrumentType = instrumentType;
} 

module.exports = Instrument;