
const mongoose = require('mongoose');


const dbConnection = async() =>{


    try {

        // Conexión a MongoDB
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true 
        });

        console.log('Conexión a MongoDB establecida');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base datos')
        
    }
}

module.exports = {
    dbConnection
}