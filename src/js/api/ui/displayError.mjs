export default function displayError(container, message) {
  const parent = document.querySelector(container);
  parent.innerHTML = `<div class="error">${message}</div>`;
}
