import axios from 'axios';
import { throttle } from 'lodash';


let lastRunTime = performance.now();

const unthrottledFetchBeers = (searchQuery = '') => {
  const beersUrl = 'https://api.punkapi.com/v2/beers';
  const finalSearchQuery = searchQuery ? `${beersUrl}?${searchQuery}` : beersUrl;

  const timeSinceLastRun = Math.floor(performance.now() - lastRunTime);
  lastRunTime = performance.now();

  console.log(finalSearchQuery, timeSinceLastRun);

  return axios.get(finalSearchQuery).then((fetchedData) => {
    const { status, data } = fetchedData;

    if (status !== 200 || !data) {
      console.log('error fetching beers, or no more beers');
      return null;
    }

    return data;
  });
};


export const fetchBeers = throttle(unthrottledFetchBeers, 1000);


export function setPage(page) {
  this.setState((prevState) => {
    const { perPage, searchQuery } = prevState;
    const searchQueryText = searchQuery ? `&${searchQuery}` : '';

    return {
      searchQuery: `page=${page}&per_page=${perPage}${searchQueryText}`,
    };
  });
}

export const setSearchQuery = a => !!a;

export function createQuery(state) {
  const { page, perPage, searchQuery } = state;
  const searchQueryText = searchQuery ? `&${searchQuery}` : '';

  return `page=${page}&per_page=${perPage}${searchQueryText}`;
}
