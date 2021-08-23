import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/issues/issuesSlice';

export const store = configureStore({
  reducer: {
    data: issuesReducer,
  },
});
