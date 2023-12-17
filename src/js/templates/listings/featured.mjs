import { BASE_API } from "../../api/constants.mjs";
import { authFetch } from "../../api/headers.mjs";

const action = "/listings/?view=newest";

export async function getFeaturedListings() {
  const getFeaturedListingsURL = `${BASE_API}${action}`;
  const response = await authFetch(getFeaturedListingsURL);

  return await response.json();
}

export async function displayFeaturedListings() {
  try {
    const featuredListings = await getFeaturedListings();
    renderFeaturedListings("#featured", featuredListings);
  } catch (error) {
    console.log(error);
  }
}

export function renderFeaturedListings(container, featuredListings) {
  const parent = document.querySelector(container);

  parent.innerHTML = "";

  let count = 0;

  const sortedFeaturedListings = featuredListings.sort((a, b) => {
    const aTimestamp = Date.parse(a.endsAt);
    const bTimestamp = Date.parse(b.endsAt);
    return bTimestamp - aTimestamp;
  });

  sortedFeaturedListings.forEach((featuredListing) => {
    const { id, title, media, endsAt } = featuredListing;

    if (count < 6) {
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
                      media[0] ?? "../../../../dist/images/defaultimage.jpeg"
                    }" alt="${title}" class="w-100" />
                  </div>
                  <div class="product-info p-4">
                    <h2><b>${title}</b></h2>
                    <div class="dateContainer">
                      <div class="end-date" id="endDate"><b>Ends at: </b><h5>${endDate}</h5></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>`;
      count++;
    }
  });
}
