const { name } = require('ejs');
const mongoose = require('mongoose');
// mongoose.connect(`mongodb+srv://fahad:WXX6mMBb8q6qS6E@cluster0.vz7c8.mongodb.net/`);
mongoose.connect('mongodb+srv://fahad:WXX6mMBb8q6qS6E@cluster0.vz7c8.mongodb.net/myDatabase?retryWrites=true&w=majority');


const userSchema = new mongoose.Schema({
    image: String,
    email: String,
    name: String,

})

module.exports = mongoose.model('User', userSchema);