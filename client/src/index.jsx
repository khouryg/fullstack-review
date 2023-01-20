import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    get((data) => {
      setRepos(data);
    });
  }, [])

  const post = function (username, cb) {
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json', // look it up
      data: JSON.stringify({'user': username}),
      success: function (data) {
        console.log('Successful Post to server');
        cb();
      },
      error: function(error) {
        console.log('this is the client post req error: ', error);
      }
    })
  }

  const get = function(cb) {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: function (data) {
        console.log('Success');
        console.log('this is the data return from serv', data);
        cb(data);
      },
      error: function(error) {
        console.log('this is the client post req error: ', error);
      }
    })
  }

  const search = function(term) {
    console.log(`${term} was searched`);
    post(term, () => {
      get((data) => {
        console.log('this is data in callback', data);
        return setRepos(data);
      })
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));