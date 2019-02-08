// @flow
import React from 'react';
import * as dateFns from 'date-fns';
import { throttle, map, isNaN, isNumber } from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';


type Props = {
  setSearchQuery: Function;
};

class AdvancedSearchForm extends React.Component<Props> {
  state = {
    ibuMax: '',
    ibuMin: '',
    abvMax: '',
    abvMin: '',
    ebcMax: '',
    ebcMin: '',
    brewedBefore: null,
    brewedAfter: null,
  };

  prevSearchQuery = '';

  constructor(props) {
    super(props);

    this.fetchBeers = throttle(this.fetchBeers, 1000);
  }

  componentDidUpdate() {
    this.fetchBeers();
  }


  fetchBeers = () => {
    const { setSearchQuery } = this.props;
    const {
      ibuMin,
      ibuMax,
      abvMin,
      abvMax,
      ebcMin,
      ebcMax,
      brewedAfter,
      brewedBefore,
    } = this.state;

    const searchQueryObj = {
      abv_gt: abvMin,
      abv_lt: abvMax,
      ibu_gt: ibuMin,
      ibu_lt: ibuMax,
      ebc_gt: ebcMin,
      ebc_lt: ebcMax,
      brewed_before: brewedBefore ? dateFns.format(brewedBefore, 'MM-yyy') : '',
      brewed_after: brewedAfter ? dateFns.format(brewedAfter, 'MM-yyyy') : '',
    };

    const searchQuery = map(searchQueryObj, (value, index) => (
      value || isNumber(value) ? `${index}=${value}` : null
    ))
      .filter(value => value)
      .join('&');


    if (this.prevSearchQuery !== searchQuery) {
      setSearchQuery(searchQuery);
    }

    this.prevSearchQuery = searchQuery;
  };


  setVal = (stateKey, event) => {
    const { currentTarget } = event;
    const { value } = currentTarget;
    const filteredValue = value && parseFloat(value, 10);
    const endsWithPoint = value[value.length - 1] === '.';

    if (value === '' || (!isNaN(filteredValue))) {
      this.setState({
        [stateKey]: endsWithPoint ? `${filteredValue}.` : filteredValue,
      });
    }
  };


  clear = () => {
    this.setState({
      ibuMax: '',
      ibuMin: '',
      abvMax: '',
      abvMin: '',
      ebcMax: '',
      ebcMin: '',
      brewedBefore: null,
      brewedAfter: null,
    });
  }


  render() {
    const {
      ibuMin,
      ibuMax,
      abvMin,
      abvMax,
      ebcMin,
      ebcMax,
      brewedAfter,
      brewedBefore,
    } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="sticky-top p-3">
          <div className="mb-3 row">
            <div className="col-sm-12">
              <h3>IBU</h3>
            </div>
            <div className="col-sm-6">
              <TextField
                id="min-ibu"
                type="text"
                label="Min"
                value={ibuMin}
                onChange={event => this.setVal('ibuMin', event)}
                fullWidth
              />
            </div>
            <div className="col-sm-6">
              <TextField
                id="max-ibu"
                type="text"
                label="Max"
                value={ibuMax}
                onChange={event => this.setVal('ibuMax', event)}
                fullWidth
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-sm-12">
              <h3>ABV</h3>
            </div>
            <div className="col-sm-6">
              <TextField
                id="min-abv"
                type="text"
                label="Min"
                value={abvMin}
                onChange={event => this.setVal('abvMin', event)}
                fullWidth
              />
            </div>
            <div className="col-sm-6">
              <TextField
                id="max-abv"
                type="text"
                label="Max"
                value={abvMax}
                onChange={event => this.setVal('abvMax', event)}
                fullWidth
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-sm-12">
              <h3>EBC</h3>
            </div>
            <div className="col-sm-6">
              <TextField
                id="min-ebc"
                type="text"
                label="Min"
                value={ebcMin}
                onChange={event => this.setVal('ebcMin', event)}
                fullWidth
              />
            </div>
            <div className="col-sm-6">
              <TextField
                id="max-ibu"
                type="text"
                label="Max"
                value={ebcMax}
                onChange={event => this.setVal('ebcMax', event)}
                fullWidth
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-sm-12">
              <h3>Brewed</h3>
            </div>
            <div className="col-sm-6">
              <DatePicker
                margin="normal"
                label="After"
                value={brewedAfter}
                onChange={date => this.setState({ brewedAfter: date })}
                disableFuture
                fullWidth
                clearable
              />
            </div>
            <div className="col-sm-6">
              <DatePicker
                margin="normal"
                label="Before"
                value={brewedBefore}
                onChange={date => this.setState({ brewedBefore: date })}
                disableFuture
                fullWidth
                clearable
              />
            </div>
          </div>

          <div className="mb-3">
            <button type="button" className="btn btn-secondary" onClick={this.clear}>Clear All</button>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default AdvancedSearchForm;
