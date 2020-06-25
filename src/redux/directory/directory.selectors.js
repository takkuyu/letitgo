import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectoryCategories = createSelector(
  [selectDirectory],
  directory => directory.categories
);
