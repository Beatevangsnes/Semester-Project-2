import * as listings from "../../api/listings/index.mjs";
import { getParam } from "../../api/utils/tools.mjs";

export async function setRemoveListingListener(id) {
  const listingId = getParam("id");

  try {
    const removeButton = document.querySelector("#removeBtn");

    removeButton.addEventListener("click", async ({ target }) => {
      const response = await listings.removeListing(listingId);
      console.log(response);
    });
  } catch (error) {
    console.warn(error);
  }
}
