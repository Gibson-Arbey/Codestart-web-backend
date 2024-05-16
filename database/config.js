const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN, {
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASS,
            dbName: "codestart",
        });
        console.log("Base de datos online")
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection,
};
