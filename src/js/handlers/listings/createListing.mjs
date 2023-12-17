// listings/createListings.mjs

import { createListing } from "../../api/listings/create.mjs";

export function setCreateListingFormListener() {
  const form = document.querySelector("#createListing");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const mediaValues = formData.getAll("media[]");
      const listing = Object.fromEntries(formData.entries());
      listing.media = mediaValues; // Ensure media is an array

      createListing(listing);
    });
  }
}
