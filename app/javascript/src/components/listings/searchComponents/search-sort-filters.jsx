// Dependencies
// -----------------------------------------------
import React from 'react';

// Components
// -----------------------------------------------
import SearchFilters from './search-filters';

// -----------------------------------------------
// COMPONENT->SEARCH-SORT-FILTERS ----------------
// -----------------------------------------------
export default class SearchSortFilters extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: false,
      sortVisible: false
    };
  }

  updateVisiblity = () => {
    this.setState({
      filtersVisible: !this.state.filtersVisible,
      sortVisible: false
    });
  };

  render() {
    const translate = this.props.translate;
    return (
      <section>
        <SearchFilters
          isLoading={this.props.isLoading}
          isLoaded={this.props.isLoaded}
          updateFilter={this.props.updateFilter}
          updateVisiblity={this.updateVisiblity}
          checkIn={this.props.checkIn}
          checkOut={this.props.checkOut}
          guests={this.props.guests}
          max_price={this.props.max_price}
          min_price={this.props.min_price}
          visible={this.state.filtersVisible}
          respondToDatesChange={this.props.respondToDatesChange}
          respondToGuestsChange={this.props.respondToGuestsChange}
          filter_numBedrooms={this.props.filter_numBedrooms}
          filter_numBathrooms={this.props.filter_numBathrooms}
          filter_instantBook={this.props.filter_instantBook}
          filter_priceLow={this.props.filter_priceLow}
          filter_priceHigh={this.props.filter_priceHigh}
          filter_distance={this.props.filter_distance}
          updatePriceFilters={this.props.updatePriceFilters}
          currency={this.props.currency}
          translate={translate}
          fetchSearchData={this.props.fetchSearchData}
          instantBookingOnly={this.props.instantBookingOnly}
          toggleInstantBooking={this.props.toggleInstantBooking}
          datesSet={this.props.datesSet}
          selectedAmenities={this.props.selectedAmenities}
          displayFormat={this.props.displayFormat}
          view={this.props.view}
          maxGuests={this.props.maxGuests}
          maxBedrooms={this.props.maxBedrooms}
          maxBaths={this.props.maxBaths}
        />
      </section>
    );
  }
}
