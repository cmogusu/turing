// @flow
import React from 'react';
import MaterialUiModal from '@material-ui/core/Modal';
import RecommendedBeer from './RecommendedBeer.js';
import BeerPage from './BeerPage.js';

type Props = {
  isModalVisible: boolean,
  activeBeer: {},
  recommendedBeers: Array<{}>,
  onClose: Function,
  showModal: Function,
};


function Modal(props: Props) {
  const {
    isModalVisible,
    onClose,
    activeBeer,
    recommendedBeers,
    showModal,
  } = props;

  return (
    <MaterialUiModal
      aria-labelledby="Edit booking"
      aria-describedby="Edit the details of this booking"
      open={isModalVisible}
      onClose={onClose}
      className="centered-modal"
    >
      <div className="modal-bg rounded p-3 overflow-auto">
        <div className="overflow-hidden">
          <button type="button" className="close" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
          <BeerPage {...activeBeer}>
            <div>
              <h4 className="title">You may also like:</h4>
              <div className="row">
                {recommendedBeers.map((beer, index) => (
                  <RecommendedBeer
                    key={beer.id}
                    {...beer}
                    setClicked={() => showModal(index)}
                  />
                ))}
              </div>
            </div>
          </BeerPage>
        </div>
      </div>
    </MaterialUiModal>
  );
}


export default Modal;
