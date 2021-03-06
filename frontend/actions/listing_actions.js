import * as APIUtil from '../util/listing_api_util';

export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const RECEIVE_LISTING = 'RECEIVE_LISTING';
export const DELETE_LISTING = 'DELETE_LISTING';
export const RECEIVE_LISTING_ERRORS = 'RECEIVE_LISTING_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
})

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings
})

export const removeListing = listing => ({
  type: DELETE_LISTING,
  listing
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const receiveErrors = errors => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
})

export const fetchListings = () => dispatch => (
  APIUtil.fetchListings().then(listings => dispatch(
    receiveListings(listings)))
)

export const fetchListing = (id) => dispatch => (
  APIUtil.fetchListing(id).then(listing => dispatch(
    receiveListing(listing)))
)

export const createListing = (listing) => dispatch => (
  APIUtil.createListing(listing).then(
    listing => {
      dispatch(receiveListing(listing));
      return listing.id;
    },
    err => {
      dispatch(receiveErrors(err.responseJSON));
      return false;
    }
  )
)

export const deleteListing = (listing) => dispatch => (
  APIUtil.deleteListing(listing.id).then(
    listing => dispatch(removeListing(listing)))
)

export const updateListing = (listing) => dispatch => (
  APIUtil.updateListing(listing.id).then(
    listing => (dispatch(receiveListing(listing)
)), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
)
