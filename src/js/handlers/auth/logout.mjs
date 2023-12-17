export function setLogoutListener() {
  const logOut = document.querySelector(".logout");

  if (logOut) {
    logOut.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        window.location.replace("/index.html");
      }
    });
  }
}
