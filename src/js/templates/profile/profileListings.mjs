import { getProfile } from "../../api/index.mjs";
import { getProfileListings } from "../../api/index.mjs";

export async function viewProfileListings() {
  try {
    const listings = await getProfileListings();
    renderProfileListings("#profileListings", listings);
  } catch (error) {
    console.log(error);
  }
}

export function renderProfileListings(container, listings) {
  const profileListings = document.querySelector(
    ".profile-listings",
    container
  );

  profileListings.innerHTML = "";
  listings.forEach((listing) => {
    const { id, title, description, endsAt, media, updated } = listing;

    const endDate = new Date(endsAt).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log(listing);
    profileListings.innerHTML += `
        <div class="card m-4 border">
            <div class="card-body">
                <div class="w-100">
                    <div class="product">
                        <div class="product-image">
                            <img src="${
                              media[0] ??
                              "../../../../dist/images/defaultimage.jpg"
                            }" alt="${title}" class="w-100"/>
                        </div>
                        <div class="product-info p-4">
                            <h2><b>${title}</b></h2>
                        <div id="dateContainer">
                            <h5 class="end-date" id="endDate"><b>Ends at:</b> ${endDate}</h5>
                        </div>
                        <a href="/listing/index.html?id=${id}" class="listing-link text-center">
                                <button class="btn mt-4 w-40 text-center">View</button>
                            </a>
                        </div>
                    </div>
                </div>    
            </div>
            </div>
        </div> `;
  });
}
