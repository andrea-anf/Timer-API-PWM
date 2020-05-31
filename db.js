const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.MONGO_URI; //connecting to ciphertrick
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useFindAndModify: false
};

mongoose.connect(mongoURI, options)
.then(()=>{
    console.log('Successful connected');
})
.catch(err=>{
    console.log('error: ' + err);
});

// process.on('SIGINT', ()=>{
//     mongoose.connection.close(()=>{
//         console.log('App terminated, closing mongo connections');
//         process.exit(0);
//     });
// });
