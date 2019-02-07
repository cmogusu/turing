// @flow
import React from 'react';
import 'intersection-observer';
import Beer from './Beer.js';
import Modal from './Modal.js';

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
  };

  intersectionElement = null;

  imageIntersectionObserver = null;


  componentDidMount() {
    this.loadBeersOnPageScroll();
  }


  toggleFavourite = (index) => {
    const { beers } = this.props;
    const beer = beers[index];
    const { isFavourite = false, id } = beer;
    console.log(isFavourite, id, beer);
    // if (true) return;
  };


  loadBeersOnPageScroll = () => {
    const intersectionOptions = {
      root: null,
      rootMargin: '300px',
      threshold: 0,
    };
    const loadNextPage = () => {
      const {
        setPage,
        page,
        beers,
        perPage,
      } = this.props;

      if (beers.length < (perPage * page)) {
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


  loadBeerImageOnScroll = (imageElement) => {
    const loadImage = (entries, observer) => {
      entries.forEach(function(entry) {
        const { target: image, isIntersecting } = entry;

        if (isIntersecting) {
          const { dataset } = image;
          const { src } = dataset;

          if (src) {
            image.src = src;
          }

          image.classList.remove('lazy-load');
          observer.unobserve(image);
        }
      });
    };

    if (!this.imageIntersectionObserver) {
      const intersectionOptions = {
        root: null,
        rootMargin: '1px',
        threshold: 0.5,
      };

      this.imageIntersectionObserver = new window.IntersectionObserver(
        loadImage,
        intersectionOptions,
      );
    }

    this.imageIntersectionObserver.observe(imageElement);
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
    } = this.state;
    const recommended = beers.slice(0, 3);

    if (!beers) {
      return (
        <div>
          Loading beers
          <img src="" alt="loading beers" />
        </div>
      );
    }

    return (
      <main>
        <div className="row no-gutters align-items-stretch">
          {beers.map((beer, index) => (
            <Beer
              key={beer.id}
              beer={beer}
              setClicked={() => this.showModal(index)}
              toggleFavourite={() => this.toggleFavourite(index)}
              loadBeerImageOnScroll={this.loadBeerImageOnScroll}
            />
          ))}
          <div className="load-next-page" ref={(element) => { this.intersectionElement = element; }} />
        </div>
        <Modal
          isModalVisible={isModalVisible}
          activeBeer={beers[indexOfBeerInModal]}
          recommendedBeers={recommended}
          showModal={this.showModal}
          onClose={() => this.setState({ isModalVisible: false })}
        />
      </main>
    );
  }
}

export default Body;
