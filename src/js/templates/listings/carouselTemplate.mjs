export function createCarousel(media) {
  if (!media || media.length === 0) {
    media = ["/dist/images/defaultimage.jpeg"];
  }

  let carouselItems = media
    .map(
      (imgSrc, index) => `
    <div id="item${index + 1}" class="carousel-item w-96">
      <img src="${imgSrc}" class="w-96" />
    </div>
  `
    )
    .join("");

  let navigationButtons = media
    .map(
      (_, index) => `
    <button class="btn btn-xs carousel-nav-button" data-target="#item${
      index + 1
    }">${index + 1}</button>
  `
    )
    .join("");

  return `
    <div class="carousel w-full">
      ${carouselItems}
    </div>
    <div class="flex justify-center w-full py-2 gap-2">
      ${navigationButtons}
    </div>
  `;
}
