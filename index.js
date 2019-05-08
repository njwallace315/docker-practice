const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
// note that it says 'mongo' and not 'localhost'
// use the service name that you linked for the database
let Item = null;
function connectMongoose() {
  setTimeout(function () {
    mongoose
      .connect(
        'mongodb://<username>:<password>@mongo:27017/meteor',
        { useNewUrlParser: true }
      )
      .then(() => {
        Item = require('./models/Item');
        console.log('MongoDB Connected')
      })
      .catch(err => {
        console.error('err: ', err)
      });

  }, 5000);
}

connectMongoose()

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
