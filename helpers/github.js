const axios = require('axios');
const config = require('../config.js');
const path = require('path');
const { save } = require('../database')

let getReposByUsername = (username) => {

  return axios({
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  })
  .then((response) => {
    const cleanArr = [];
    for (var i = 0; i < response.data.length; i++) {
      let cleanRepo = {
        _id: response.data[i].id,
        owner_id: response.data[i].owner.id, // owner id but using _id
        owner_name: response.data[i].owner.login,
        repo_name: response.data[i].name,
        repo_url: response.data[i].url,
        forks: response.data[i].forks,
        watchers: response.data[i].watchers
      };
      cleanArr.push(cleanRepo);
    }
    return save(cleanArr);
  })
  .catch((err) => {
    console.log('ERROR getting response from github:', err);
  })
}

module.exports.getReposByUsername = getReposByUsername;