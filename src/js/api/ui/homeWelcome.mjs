// homeWelcome.mjs
export function welcome() {
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const welcomeContainer = document.querySelector(".homepage-text");

    if (token === null) {
      welcomeContainer.innerHTML = `<h1 class="text-center mx-auto">Join the Auction Adventure</h1>
                                    <div class="homepage-buttons">
                                      <div class="login-button">
                                        <a href="/profile/login/">Log In</a>
                                      </div>
                                      <p class="text-center p-4">or</p>
                                      <div class="register-button">
                                        <a href="/profile/register/">Register</a>
                                      </div>
                                    </div>`;
    }
  });
}
