// router.mjs

import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import { checkAuth } from "./api/index.mjs";
import { welcome } from "./api/ui/homeWelcome.mjs";

export default function router() {
  const path = location.pathname;

  switch (path) {
    case "/":
    case "/index.html":
      checkAuth();
      welcome();
      templates.displayFeaturedListings();

      listeners.setLogoutListener();
      break;

    case "/profile/register/":
    case "&profile/register/index.html":
      checkAuth();
      listeners.setRegisterFormListener();
      listeners.setLogoutListener();
      break;

    case "/profile/login/":
    case "/profile/login/index.html":
      checkAuth();
      listeners.setLoginFormListener();
      listeners.setLogoutListener();
      break;

    case "/listings/":
    case "/listings/index.html":
      checkAuth();
      templates.displayListings();
      listeners.setLogoutListener();
      break;

    case "/listing/":
    case "/listing/index.html":
      checkAuth();
      templates.viewSingleListing();
      listeners.createBidListener();
      listeners.setLogoutListener();
      break;

    case "/listing/create/":
    case "/listing/create/index.html":
      checkAuth();
      listeners.setCreateListingFormListener();
      listeners.setAddMoreMediaListener();
      listeners.setLogoutListener();
      break;

    case "/listing/edit/":
    case "/listing/edit/index.html":
      checkAuth();
      listeners.setUpdateListingFormListener();
      listeners.setAddMoreMediaListener();
      listeners.setRemoveListingListener();
      listeners.setLogoutListener();
      break;

    case "/profile/":
    case "/profile/index.html":
      checkAuth();
      templates.viewProfile();
      templates.viewProfileListings();
      listeners.setLogoutListener();
      break;

    case "/profile/edit/":
    case "/profile/edit/index.html":
      checkAuth();
      listeners.setUpdateProfileFormListener();
      listeners.setLogoutListener();
      break;

    default:
    // Handle other cases or paths
  }
}
