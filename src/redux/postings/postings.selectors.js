import { createSelector } from 'reselect';

const selectPostings = state => state.postings;

export const selectPosts = createSelector(
  [selectPostings],
  postings => {
    return postings.posts
  }
);

export const selectPostsByCategory = (category) =>
  createSelector(
    [selectPosts],
    posts => {
      console.log(category)
      return posts.filter(post => post.category === category)
    }
  );