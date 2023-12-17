import { displayListings } from "../../../templates/listings/list.mjs";
import { renderListings } from "../../../templates/listings/list.mjs";

export function setupSearch(listings, container) {
  const searchForm = document.querySelector("form#search");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const searchTerm = form.term.value;
    const term = searchTerm.toLowerCase();

    console.log(searchTerm);

    const filteredListings = listings.filter(function (listing) {
      const title = listing.title.toLowerCase();
      const description = listing.description ?? "".toLowerCase();
      const seller = listing.seller.name.toLowerCase();

      const tagsMatch = Boolean(
        listing.tags
          .map((tag) => tag.toLowerCase())
          .filter((tag) => tag.includes(term)).length
      );

      return (
        title.includes(term) ||
        tagsMatch ||
        seller.includes(term) ||
        description.includes(term)
      );
      //
      //
    });
    console.log(filteredListings);
    renderListings(container, filteredListings);
  });
}
