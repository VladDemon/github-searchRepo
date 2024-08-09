import { configureStore } from '@reduxjs/toolkit';
import repositoryReducer from './repoSlice';

export const store = configureStore({
  reducer: {
    repositories: repositoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
