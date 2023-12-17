import { BASE_API } from "../constants.mjs";
import { authFetch } from "../headers.mjs";
import { profile } from "../auth/state.mjs";

const action = "/profiles";

export async function getProfiles() {
  const getProfilesURL = `${BASE_API}${action}`;

  const response = await authFetch(getProfilesURL);
  return await response.json();
}

export async function getProfile(name) {
  const me = profile();
  console.log(me);

  const getProfileURL = `${BASE_API}${action}/${me.name}?_listings=true`;
  console.log(getProfileURL);
  const response = await authFetch(getProfileURL);

  return await response.json();
}

export async function getProfileListings() {
  const me = profile();
  const getProfileListingsURL = `${BASE_API}${action}/${me.name}/listings`;

  const response = await authFetch(getProfileListingsURL);

  return await response.json();
}
