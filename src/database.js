const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tendedero_virtual', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
  .then(db => console.log('DB conectada'))
  .catch(err => console.log('Error'));