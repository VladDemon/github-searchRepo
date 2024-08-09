import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getRepositories } from './store/repoSlice';
import { RepositoryTable } from './components/RepoTable';
import { RepositoryDetail } from './components/RepoDetail';
import { RepoSearch } from './components/RepoSearch';

import { Grid } from '@mui/material';

function App() {
  const dispatch = useAppDispatch();
  const { repositories, status } = useAppSelector((state) => state.repositories);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    dispatch(getRepositories({ query: searchQuery, sort: 'stars', order: 'desc', page: 1, perPage: 10 }));
  };

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RepoSearch setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={8}>
          <RepositoryTable onSelectRepo={handleSelectRepo} />
        </Grid>
        <Grid item xs={4}>
          {selectedRepo && (
            <RepositoryDetail
              name={selectedRepo.name}
              description={selectedRepo.description}
              license={selectedRepo.license?.name}
              language={selectedRepo.language}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
