const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {getReposByUsername} = require('../helpers/github.js');
const { save, getAll } = require('../database')

let app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use(express.static('client/dist/'));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.user)
  .then(()=>{
    console.log('I saved the data to the DB');
    res.json('post request success');
  })
  .catch((err)=>{
    console.log('Error saving to the DB', err);
  })

});

app.get('/repos', function (req, res) {
  console.log('somebody is hitting get req')
  getAll()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log('ERROR getting all repos');
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

