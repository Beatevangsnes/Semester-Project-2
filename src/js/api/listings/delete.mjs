import { BASE_API } from "../constants.mjs";
import { authFetch } from "../headers.mjs";

const action = "/listings";
const method = "delete";

export async function removeListing(id) {
  if (!id) {
    throw new Error("Listing-ID required to delete listing");
  }

  const removeListingURL = `${BASE_API}${action}/${id}`;

  const token = localStorage.token;

  if (!token) {
    throw new Error("You must be logged in to delete a listing");
  }

  const response = await authFetch(removeListingURL, {
    method,
  });

  if (response.ok) {
    confirm("Are you sure you want to delete this listing?");
    window.location.replace("/listings/");
    return await response.json();
  } else {
    alert("You do not have permission to delete this listing");
  }

  console.log(response);

  throw new Error("Could not delete this item");
}
