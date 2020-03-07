const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const InstrumentRouter = require('./routers/Instrument');
const UserRouter = require('./routers/user');

const dotenv = require('dotenv');
dotenv.config();


const publicDirectoryPath = path.join(__dirname, '../public');




const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(InstrumentRouter);
app.use(UserRouter);
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


require('./BootStrap');