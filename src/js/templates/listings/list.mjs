import { getListings } from "../../api/listings/index.mjs";
import { setupSearch } from "../../api/index.mjs";

export async function displayListings() {
  try {
    const container = document.querySelector("#listings");
    const listings = await getListings();
    renderListings("#listings", listings);
    console.log(listings);

    setupSearch(listings, container);
  } catch (error) {
    console.log(error);
  }
}

export function renderListings(container, listings) {
  const parent = document.querySelector("#listings", container);

  parent.innerHTML = "";

  listings.forEach((listing) => {
    const {
      id,
      title,
      description,
      media,
      endsAt,
      created,
      updated,
      tags,
      seller,
    } = listing;

    const truncatedTitle =
      title.length > 45 ? title.substring(0, 45) + "..." : title;

    const endDate = new Date(endsAt).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    parent.innerHTML += `
    <a href="/listing/index.html?id=${id}" class="card">
    <div class="card m-4">
      <div class="card-body">
        <div class="w-100">
          <div class="product">
            <div class="product-image">
              <img src="${
                media[0] ?? "../../../../images/defaultimage.jpeg"
              }" alt="${truncatedTitle}" class="w-100"/>
            </div>
            <div class="product-info p-4">
              <h2><b>${truncatedTitle}</b></h2>
              <div id="dateContainer" class="dateContainer">
                <div class="end-date" id="endDate"><b>Ends at: </b><h5>${endDate}</h5></div>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div> 
  </a>`;
  });
}
