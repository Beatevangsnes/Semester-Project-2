// showBids.mjs
export const bidHistory = (() => {
  const uniqueBidIds = new Set();

  return (bids, limit = null) => {
    if (bids.length === 0) {
      return "No bids yet";
    }

    const sortedBids = [...bids].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    const bidsToShow = limit ? sortedBids.slice(0, limit) : sortedBids;

    const result = bidsToShow
      .filter((bid) => {
        if (uniqueBidIds.has(bid.id)) {
          return false;
        }
        uniqueBidIds.add(bid.id);
        return true;
      })
      .map((bid) => {
        const { bidderName, amount, created } = bid;
        const bidDate = new Date(created).toLocaleString();
        const defaultAvatarSrc = "/dist/images/user2.png";

        return `
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img alt="Avatar of ${bidderName}" src="${defaultAvatarSrc}" />
              </div>
            </div>
            <div class="chat-bubble">
              <p><strong>Bidder:</strong> ${bidderName}</p>
              <p><strong>Amount:</strong> ${amount} $</p>
              <p><strong>Placed on:</strong> ${bidDate}</p>
            </div>
          </div>
        `;
      })
      .join("");

    return result;
  };
})();
