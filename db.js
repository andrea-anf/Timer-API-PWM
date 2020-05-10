const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = 'mongodb+srv://baddasstimer:kfkuyXefVvQC6ClX@mycluster-a9m3y.mongodb.net/test?retryWrites=true&w=majority'; //connecting to ciphertrick
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
