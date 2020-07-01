import { createSelector } from 'reselect';
import filterLists from '../../components/filter/filter.lists';
import filtersListNames from '../../components/filter/filter.names';

const selectPostings = state => state.postings;

export const selectPosts = createSelector(
  [selectPostings],
  postings => {
    return postings.posts
  }
);

export const selectPostsByCategory = (category, filters = {}) =>
  createSelector(
    [selectPosts],
    posts => {
      if (!posts) return [];
      let filteredPosts = [];
      const formatted_category = category.charAt(0).toUpperCase() + category.slice(1);

      filteredPosts = posts.filter(post => post.category === formatted_category);

      if (filters) filteredPosts = filterItems(filteredPosts, filters);

      return filteredPosts;
    }
  );

function filterItems(items, filters) {
  for (let k of Object.keys(filters)) {
    const filterType = filterLists.filter(filter => filter.name.toLowerCase() === k)[0];
    const filterValue = filterType.lists.filter(list => list.id === Number(filters[k]))[0].value;
    switch (filterType.name) {
      case filtersListNames.PRICE:
        items = items.filter(item => filterValue.pmin <= item.price && item.price <= filterValue.pmax);
        break;
      case filtersListNames.CONDITION:
        items = items.filter(item => item.condition.toLowerCase() === filterValue);
        break;
      case filtersListNames.SHIPPING:
        items = items.filter(item => item.shipping.toLowerCase() === filterValue);
        break;
      default:
        break;
    }
  }
  return items
}

export const selectIsPostsLoaded = createSelector(
  [selectPostings],
  postings => {
    console.log('selectIsPostsLoaded -> ' + !!postings.posts)
    return !!postings.posts
  }
);