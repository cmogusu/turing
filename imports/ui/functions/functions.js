import axios from 'axios';
import { throttle, shuffle } from 'lodash';


const unthrottledFetchBeers = (searchQuery = '') => {
  const beersUrl = 'https://api.punkapi.com/v2/beers';
  const finalSearchQuery = searchQuery ? `${beersUrl}?${searchQuery}` : beersUrl;

  console.log(finalSearchQuery);

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


export function createQuery(state) {
  const { page, perPage, searchQuery } = state;
  const searchQueryText = searchQuery ? `&${searchQuery}` : '';

  return `page=${page}&per_page=${perPage}${searchQueryText}`;
}


export function getRecommendedBeersByIbu(beers, beerBeingViewedIndex, numberOfRecommendedBeers = 3) {
  if (beers.length - 1 < numberOfRecommendedBeers) {
    return beers;
  }

  let clonedBeers = beers.slice();
  const beerBeingViewed = clonedBeers[beerBeingViewedIndex];
  const beerBeingViewedIbu = beerBeingViewed.ibu || 30;

  delete clonedBeers[beerBeingViewedIndex];
  clonedBeers = shuffle(clonedBeers);
  clonedBeers = clonedBeers.filter(beer => !!beer);

  let recommendedBeers = [];
  let maxRetries = 5;
  let ibuVariation = 5;

  while (recommendedBeers.length < numberOfRecommendedBeers && maxRetries > -1) {
    const maxIbu = beerBeingViewedIbu + ibuVariation;
    const minIbu = beerBeingViewedIbu - ibuVariation;
    const requiredBeers = numberOfRecommendedBeers - recommendedBeers.length;

    const relatedbeers = clonedBeers.filter(beer => (
      beer.ibu < maxIbu || beer.ibu > minIbu
    ));

    recommendedBeers.concat(relatedbeers.slice(0, requiredBeers));

    ibuVariation += 5;
    maxRetries -= 1;
  }

  if (recommendedBeers.length < numberOfRecommendedBeers) {
    const requiredBeers = numberOfRecommendedBeers - recommendedBeers.length;

    recommendedBeers = clonedBeers.slice(0, requiredBeers);
  }

  return recommendedBeers;
}
