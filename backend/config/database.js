
const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://emingala02:admin1234@cluster0.argacqg.mongodb.net/IT-ELECTIVE?retryWrites=true&w=majority", {
        useNewUrlParser: true,  // Optional, can remove for newer versions
        useUnifiedTopology: true,  // Optional, can remove for newer versions
    })
    .then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);  // Exit the process with a failure code
    });
};

module.exports = connectDatabase