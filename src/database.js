let mongoose = require('mongoose');

const server = 'Tvastra:sgoc.2030@cluster0.w2dnb.mongodb.net'; // REPLACE WITH YOUR DB SERVER
const database = 'Tvastra';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb+srv://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()