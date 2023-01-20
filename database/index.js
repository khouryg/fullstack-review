const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: {type: Number, unique: true},
  owner_id: Number, // owner id but using _id
  owner_name: String,
  repo_name: String,
  repo_url: String,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

const save = (repoArr) => {
  return Repo.insertMany(repoArr);
}

const getAll = () => {
  return Repo.find().sort({watchers: -1}).limit(25);
}

module.exports.save = save;
module.exports.getAll = getAll;