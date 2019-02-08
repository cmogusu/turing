// @flow
import React from 'react';
import 'intersection-observer';
import Beer from './Beer.js';
import Modal from './Modal.js';
import Loading from './Loading.js';
import { getRecommendedBeersByIbu } from '../functions/functions.js';

type Props = {
  beers: Array,
  perPage: number,
  page: number,
  setPage: Function,
};

class Body extends React.Component<Props> {
  state = {
    isModalVisible: false,
    indexOfBeerInModal: -1,
    areBeersExhausted: false,
  };


  intersectionElement = null;

  beerIntersectionObserver = null;

  componentDidMount() {
    this.loadBeersOnPageScroll();
  }


  loadBeersOnPageScroll = () => {
    const intersectionOptions = {
      root: null,
      rootMargin: '300px',
      threshold: 0,
    };
    const loadNextPage = (entries) => {
      const { isIntersecting } = entries[0];
      const {
        setPage,
        page,
        beers,
        perPage,
      } = this.props;
      const areBeersExhausted = beers.length < (perPage * page);

      if (areBeersExhausted) {
        this.setState({ areBeersExhausted });
        return;
      }

      if (!isIntersecting) {
        return;
      }

      window.requestIdleCallback(() => {
        setPage(page + 1);
      });
    };

    const observer = new window.IntersectionObserver(loadNextPage, intersectionOptions);
    if (this.intersectionElement) {
      observer.observe(this.intersectionElement);
    } else {
      console.log('no intersection element', this.intersectionElement);
    }
  };


  animateBeerOnScroll = (beerWrapperElement) => {
    const loadImage = (entries, observer) => {
      entries.forEach(function(entry) {
        const { target: wrapperElement, isIntersecting } = entry;

        if (!isIntersecting) {
          return;
        }

        const image = wrapperElement.querySelector('.beer-image');
        const { dataset } = image;
        const { src } = dataset;

        wrapperElement.classList.add('animated', 'slideInUp');

        if (src) {
          image.src = src;
        }

        image.classList.remove('lazy-load');
        observer.unobserve(image);
      });
    };

    if (!this.beerIntersectionObserver) {
      const intersectionOptions = {
        root: null,
        rootMargin: '1px',
        threshold: 0,
      };

      this.beerIntersectionObserver = new window.IntersectionObserver(
        loadImage,
        intersectionOptions,
      );
    }

    this.beerIntersectionObserver.observe(beerWrapperElement);
  };


  showModal = (beerIndex) => {
    this.setState({
      isModalVisible: true,
      indexOfBeerInModal: beerIndex,
    });
  };


  render() {
    const { beers } = this.props;
    const {
      isModalVisible,
      indexOfBeerInModal,
      areBeersExhausted,
    } = this.state;

    const recommendedBeers = isModalVisible ? getRecommendedBeersByIbu(beers, indexOfBeerInModal, 3) : [];

    return (
      <main className="container">
        {!!beers.length && (
          <div className="row no-gutters align-items-stretch">
            {beers.map((beer, index) => (
              <Beer
                key={beer.id}
                beer={beer}
                setClicked={() => this.showModal(index)}
                animateBeerOnScroll={this.animateBeerOnScroll}
              />
            ))}
          </div>
        )}

        {!areBeersExhausted && <Loading />}

        <div ref={(element) => { this.intersectionElement = element; }} />

        <Modal
          isModalVisible={isModalVisible}
          activeBeer={beers[indexOfBeerInModal]}
          recommendedBeers={recommendedBeers}
          showModal={this.showModal}
          onClose={() => this.setState({ isModalVisible: false })}
        />
      </main>
    );
  }
}


export default Body;
