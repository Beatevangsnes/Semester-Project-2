import { getProfile } from "../profiles/read.mjs";

export async function checkAuth() {
  const token = localStorage.getItem("token");
  const navMenu = document.querySelector(".nav-menu");

  if (token != null) {
    try {
      const userProfile = await getProfile();
      const avatarURL = userProfile.avatar || "/dist/images/user2.png";

      navMenu.innerHTML = `
      <div class="navbar">
        <div class="flex-1">
        <a href="/index.html" class="ml-4" >The Auction House</a>
        </div>
        <div class="md:hidden">
          <button id="hamburger" class="btn btn-ghost">
            <!-- Hamburger icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
        <div class="hidden md:flex flex-none gap-4 items-center">
          <a href="/index.html" class="nav-link btn btn-ghost">Home</a>
          <a href="/listings/" class="nav-link btn btn-ghost">Listings</a>
          <a href="/listing/create/" class="nav-link btn btn-ghost">+ New Listing</a>
        </div>
        <div class="flex-none gap-2">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar mx-2">
              <div class="w-10 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                <img alt="User Avatar" src="${avatarURL}" />
              </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><a href="/profile/" class="dropdown-item btn btn-ghost">View Profile</a></li>
              <li><a href="/profile/edit/" class="dropdown-item btn btn-ghost">Edit Profile</a></li>
              <li><a href="#" class="dropdown-item btn btn-ghost logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Mobile Menu (Dropdown) -->
      <div class="mobile-menu hidden absolute right-0 bg-base-100 shadow-md rounded-lg p-2 dropdown-content w-64 z-50">
        <a href="/index.html" class="block px-4 py-2 hover:bg-gray-100">Home</a>
        <a href="/listings/" class="block px-4 py-2 hover:bg-gray-100">Listings</a>
        <a href="/listing/create/" class="block px-4 py-2 hover:bg-gray-100">+ New Listing</a>
        <!-- Additional mobile menu items -->
      </div>
      `;
      setupMobileMenu();
      setupLogout();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  } else {
    navMenu.innerHTML = `
    <div class="navbar relative">
      <div class="flex-1">
      <a href="/index.html" class="ml-4" >The Auction House</a>
      </div>
      <div class="md:hidden">
        <button id="hamburger" class="btn btn-ghost">
          <!-- Hamburger icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <div class="hidden md:flex flex-none gap-4 items-center">
        <a href="/index.html" class="nav-link btn btn-ghost">Home</a>
        <a href="/listings" class="nav-link btn btn-ghost">Listings</a>
        <a href="/profile/login/" class="nav-link btn btn-ghost">Log in</a>
        <a href="/profile/register/" class="nav-link btn btn-ghost">Register</a>
      </div>
      <!-- Mobile Menu (Dropdown) -->
      <div class="mobile-menu hidden block absolute top-full right-0 bg-base-100 shadow-md rounded-lg p-2 dropdown-content w-64 z-50">
        <a href="/index.html" class="block px-4 py-2 hover:bg-gray-100 text-left">Home</a>
        <a href="/profile/login/" class="block px-4 py-2 hover:bg-gray-100 text-left">Log in</a>
        <a href="/profile/register/" class="block px-4 py-2 hover:bg-gray-100 text-left">Register</a>
      </div>
    </div>
    `;
    setupMobileMenu();
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const pathname = window.location.pathname;

  navLinks.forEach((navLink) => {
    const linkPath = new URL(navLink.href).pathname;
    if (pathname.startsWith(linkPath)) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
}

function setupLogout() {
  const logoutButton = document.querySelector(".logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.replace("/profile/login/");
    });
  }
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  const avatarButton = document.querySelector(".avatar");
  const dropdownContent = document.querySelector(".dropdown-content");

  avatarButton.addEventListener("click", () => {
    dropdownContent.classList.toggle("hidden");
  });
}
