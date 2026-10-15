
const mongoose = require('mongoose');

let connectionPromise;

const dbConnection = async() =>{
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        if (!process.env.URI) {
            throw new Error('La variable de entorno URI no está configurada');
        }

        // Reutilizar la conexión entre invocaciones de Vercel y solicitudes concurrentes.
        if (!connectionPromise) {
            connectionPromise = mongoose.connect(process.env.URI, {
                serverSelectionTimeoutMS: 8000,
            }).catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
        }

        await connectionPromise;
        return mongoose.connection;
    } catch (error) {
        console.error('No fue posible conectar con MongoDB:', error.message);
        throw error;
    }
}

module.exports = {
    dbConnection
}
