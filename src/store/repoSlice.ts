import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepositories } from '../services/githubApi';

import { GitHubRepository } from '../util/types/interface';

interface RepositoryState {
  repositories: GitHubRepository[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalCount: number;
  currentPage: number;
  selectedRepository: null,
}

const initialState: RepositoryState = {
  repositories: [],
  status: 'idle',
  error: null,
  totalCount: 0,
  currentPage: 1,
  selectedRepository: null,
};

export const getRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (params: { query: string; sort: string; order: string; page: number; perPage: number }) => {
    const response = await fetchRepositories(params.query, params.sort, params.order, params.page, params.perPage);
    return response;
  }
);

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setSelectedRepository(state, action) {
        state.selectedRepository = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.repositories = action.payload.items;
        state.totalCount = action.payload.total_count;
      })
      .addCase(getRepositories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setPage } = repositorySlice.actions;

export default repositorySlice.reducer;
