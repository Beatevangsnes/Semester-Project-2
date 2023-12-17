import { createBid } from "../../api/listings/bid.mjs";

export async function createBidListener() {
  const bidBtn = document.querySelector("#bidBtn");

  bidBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const bidInput = document.querySelector("#bidInput");
    const inputCredit = parseInt(bidInput.value);

    createBid(inputCredit);
    console.log(createBid);
  });
}
