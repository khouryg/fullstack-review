import React from 'react';

const RepoList = ({ repos }) => {
  const repoLength = repos.length;
  const mapRepos = repos.map((x) => (
    <div>
      Repo ID: {x._id} Owner: {x.owner_name} Repo Name: {x.repo_name}
    </div>
  ))

  return (
    <div>
      <h4>Repo List Component</h4>
      <p>There are {repoLength} repos.</p>

      {mapRepos}
    </div>
  )
}

export default RepoList;