const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    try {
        let allUsers = await userModel.find();
        res.render('read', { allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/edit/:userid', async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userid });
        res.render('edit', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Change to POST method for updating
app.post('/update/:userid', async (req, res) => {
    const { image, name, email } = req.body;
    try {
        await userModel.findOneAndUpdate(
            { _id: req.params.userid },
            { name, image, email },
            { new: true }
        );
        res.redirect('/read'); // Redirect to the users list after update
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create', async (req, res) => {
    const { name, email, image } = req.body;
    try {
        await userModel.create({ name, email, image });
        res.redirect('/read');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findOneAndDelete({ _id: req.params.id });
        res.redirect('/read');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
