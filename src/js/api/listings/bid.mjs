import { BASE_API } from "../constants.mjs";
import { load } from "../../storage/index.mjs";
import { getParam } from "../utils/tools.mjs";

const id = getParam("id");
const method = "post";
const action = "/listings";

export async function createBid(bidTotal) {
  const token = load("token");
  const createBidURL = `${BASE_API}${action}/${id}/bids`;

  console.log(bidTotal);

  let bidAmount = {
    amount: bidTotal,
  };

  const response = await fetch(createBidURL, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bidAmount),
  });

  const listingData = await response.json();
  if (response.ok) {
    window.location.reload();
    return listingData;
  } else {
    alert("Oops, something went wrong. Try to bid higher than the latest bid");
  }
}
