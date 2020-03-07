const db = require('../DB/mockDB').getInstance();


function User({userId, name, instruments})  {
    this.id = userId ? userId: db.createId();
    this.name = name;
    this.instruments = instruments ? instruments : [];

    this.addInstrument = (instrument ) =>  this.instruments.push(instrument);
    this.deleteInstrument = (instrumentId) => {
        this.instruments = this.instruments.filter((instrument) => instrument.instrumentId != instrumentId)
    }
} 

module.exports = User;