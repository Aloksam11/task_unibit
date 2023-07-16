const mongoose = require("mongoose");

mongoose.set('strictQuery', false)
try {
    const connection = mongoose.connect('mongodb+srv://aloksam11:Samson0911%40@cluster0.bs2zpzu.mongodb.net/unibit');
    // const connection = mongoose.connect('mongodb://localhost:27017/drive_hub');

    if (connection) {
        console.log("connnected!");

    }

} catch (error) {
    console.log(error, "connnection is not stablish")

}

