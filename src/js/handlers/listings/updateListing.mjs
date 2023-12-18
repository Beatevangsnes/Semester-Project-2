import { getListing, updateListing } from "../../api/listings/index.mjs";
import { getParam } from "../../api/utils/tools.mjs";

export async function setUpdateListingFormListener() {
  const form = document.querySelector("#updateListing");
  const id = getParam("id");
  const currentMediaContainer = document.querySelector("#currentMedia");
  const mediaInputsContainer = document.querySelector("#mediaInputs");
  const addMoreButton = document.querySelector("#addMoreBtn");
  let listing;

  if (form && id) {
    const button = form.querySelector("#updateBtn");
    button.disabled = true;

    try {
      listing = await getListing(id);
      if (listing) {
        form.title.value = listing.title || "";
        form.description.value = listing.description || "";

        if (listing.media && Array.isArray(listing.media)) {
          listing.media.forEach((mediaUrl, index) => {
            const mediaDiv = document.createElement("div");
            mediaDiv.classList.add("media-item");

            const imgElement = document.createElement("img");
            imgElement.src = mediaUrl;
            imgElement.classList.add("existing-media-image");
            mediaDiv.appendChild(imgElement);

            const removeButton = document.createElement("button");
            removeButton.innerText = "X";
            removeButton.classList.add("remove-media-button");
            removeButton.onclick = () => {
              mediaDiv.remove();
              listing.media.splice(index, 1);
            };
            mediaDiv.appendChild(removeButton);

            currentMediaContainer.appendChild(mediaDiv);
          });
        }
      }
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      button.disabled = false;
    }

    addMoreButton.addEventListener("click", () => {
      const newInput = document.createElement("input");
      newInput.type = "url";
      newInput.name = "media[]";
      newInput.classList.add("form-control");
      mediaInputsContainer.appendChild(newInput);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const newMedia = formData
        .getAll("media[]")
        .filter((url) => url.trim() !== "");

      const combinedMedia =
        listing && listing.media ? [...listing.media, ...newMedia] : newMedia;

      const listingData = {
        title: formData.get("title"),
        description: formData.get("description"),
        media: combinedMedia,
        id: id,
      };

      updateListing(listingData);
    });
  }
}
