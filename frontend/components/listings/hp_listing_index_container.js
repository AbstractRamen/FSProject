import { connect } from 'react-redux';

import ListingIndex from './hp_listing_index';
import { fetchListings } from '../../actions/listing_actions';
import { selectAllListings } from '../../reducers/selectors';

const mapStateToProps = state => ({
  listings: selectAllListings(state)
});

const mapDispatchToProps = dispatch => ({
  fetchListings: () => dispatch(fetchListings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingIndex);
