import { BASE_API } from "../constants.mjs";
import { authFetch } from "../headers.mjs";

const action = "/listings";

export async function getListings() {
  const getListingsURL = `${BASE_API}${action}?_active=true&_seller=true`;
  const response = await authFetch(getListingsURL);

  return await response.json();
}

export async function getListing(id) {
  if (!id) {
    throw new Error("Listing-ID required to get listing");
  }

  const getListingURL = `${BASE_API}${action}/${id}?_seller=true&_bids=true`;

  const response = await authFetch(getListingURL);

  return await response.json();
}
