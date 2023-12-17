import { BASE_API } from "../constants.mjs";
import { load } from "../../storage/index.mjs";
import { authFetch } from "../headers.mjs";

const action = "/listings";
const method = "post";

export async function createListing(listingData) {
  const createListingURL = BASE_API + action;
  const token = load("token");

  const response = await authFetch(createListingURL, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(listingData),
  });

  if (response.ok) {
    alert("Your listing was created successcfully!");
    window.location.replace("/profile/");
  }

  return await response.json();
}
