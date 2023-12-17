export function setAddMoreMediaListener() {
  const addMoreBtn = document.getElementById("addMoreBtn");
  const mediaInputs = document.getElementById("mediaInputs");

  let inputIndex = 1;

  addMoreBtn.addEventListener("click", () => {
    const newInput = document.createElement("input");
    newInput.className = "form-control";
    newInput.type = "url";
    newInput.name = "media[]";
    mediaInputs.appendChild(newInput);
    inputIndex++;
  });
}
