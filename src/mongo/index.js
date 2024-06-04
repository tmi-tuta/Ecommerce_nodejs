const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = () => {
    // mongoose.connect(`mongodb+srv://db_ecommerce:${process.env.MONGO_DB}@ecommerce.ucwhiea.mongodb.net/`)
    mongoose.connect(`mongodb://localhost:27017/ecommerce_db`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connected db success');
    }).catch((err) => {
        console.log('connect db error');
        console.log(err);
    })
}

module.exports = dbConnect;