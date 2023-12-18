import { getListing } from "../../api/listings/index.mjs";
import { getParam } from "../../api/utils/tools.mjs";
import { createCarousel } from "./carouselTemplate.mjs";
import { bidHistory } from "./showBids.mjs";
import { createBidListener } from "../../handlers/listings/createBid.mjs";

export async function viewSingleListing() {
  const id = getParam("id");

  try {
    const listing = await getListing(id);
    renderListing("#listing", listing);
  } catch (error) {
    console.log(error);
  }
}

function createSellerInfoHTML(seller) {
  const { name, email, avatar } = seller;
  const avatarSrc = avatar ? avatar : "/dist/images/user2.png";
  return `
      <div class="seller-info">
          <img src="${avatarSrc}" alt="${name}" class="rounded-full" 
               style="width: 100px; height: 100px; object-fit: cover;" />
          <p>${name}</p>
          <p>${email}</p>
      </div>
  `;
}

export function renderListing(container, listing) {
  const parent = document.querySelector(container);
  parent.innerHTML = "";

  const {
    id,
    title,
    description,
    media,
    endsAt,
    created,
    updated,
    bids,
    seller,
  } = listing;

  const formattedCreated = new Date(created).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedUpdated = new Date(updated).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : "0";
  const carouselHTML = createCarousel(media);
  const sellerInfoHTML = createSellerInfoHTML(seller);
  const endDate = new Date(endsAt).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const bidFormHTML = `
      <div class="addBid text-center">
          <form id="addBid">
              <div class="form-group">
                  <label for="bidInput">Add your bid:</label>
                  <input class="form-control input input-bordered w-full max-w-xs mx-auto" 
                         id="bidInput" type="number" name="bid"
                         placeholder="Add your bid here" required maxlength="1">
              </div>
              <div class="add-bid-button">
              <button class="" id="bidBtn">Add bid</button>
              </div>
          </form>
      </div>
  `;

  parent.innerHTML += `
      <div class="">
      <div class="listing-info-container">
      <button id="backButton" class="back-button">
      <i class="fas fa-arrow-left"></i> Back to Listings
      </button>
      <div class="listing-carousel w-96 mx-auto mt-10">${carouselHTML}</div>
          <div class="listing-info card-body">
          <div class="back"></div>
            <div class="listing-text"><h1 class="">${title}</h1>
            <div class="description">
            <h3>Description:</h3>
            <p>${description}</p>
            </div>
            <h3 class="end-date">Ends at: ${endDate}</h3>
            <div class="listing-price">
            <h3 class="current-price">Current Price: </h3> <p>${highestBid} $</p></div>
            </div>
            <hr>
            <div class="add-bid-container w-70 text-center">
              ${bidFormHTML}
            </div>
            <hr>
              <div class="bids-history"><h2>Latest Bids: </h2>${bidHistory(
                bids,
                3
              )}</div>
              <div class="show-more">
              <button id="showMore" class="btn btn-dark">Show More Bids</button>
              </div>
              <hr>
              <div class="seller-info">
              <h2>Seller:</h2>
              ${sellerInfoHTML}
              </div>
              <hr>
              <div class="created-info">
              <p>Created: ${formattedCreated}</p>
              <p>Updated: ${formattedUpdated}</p>
              </div>
          </div>
      </div>
      </div>
  `;

  document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "/listings/index.html";
  });

  const showMoreButton = document.querySelector("#showMore");
  let numBidsDisplayed = 3;

  if (bids.length > 0) {
    showMoreButton.addEventListener("click", function () {
      const additionalBidsHTML = bidHistory(bids.slice(numBidsDisplayed), 3);
      document.querySelector(".bids-history").innerHTML += additionalBidsHTML;
      numBidsDisplayed += 3;

      if (numBidsDisplayed >= bids.length) {
        showMoreButton.style.display = "none";
      }
    });
  } else {
    showMoreButton.style.display = "none";
  }

  const user = JSON.parse(localStorage.getItem("profile")).name;

  if (seller.name === user) {
    const editButtonContainer = document.querySelector("#edit-button");
    const editButton = document.createElement("a");
    editButton.classList.add("edit-button", "mx-auto");

    editButton.textContent = "Edit Listing";
    const editURL = `/listing/edit/index.html?id=${id}`;
    console.log(editURL);
    editButton.setAttribute("href", editURL);

    editButtonContainer.append(editButton);
  }
  initializeCarouselNavigation();
  createBidListener();
}

function initializeCarouselNavigation() {
  const carouselButtons = document.querySelectorAll(".carousel-nav-button");

  carouselButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = button.getAttribute("data-target");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    });
  });
}
