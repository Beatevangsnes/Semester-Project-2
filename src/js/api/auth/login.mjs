import { BASE_API } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = BASE_API + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const { accessToken, ...user } = await response.json();

  if (response.ok) {
    storage.save("token", accessToken);

    storage.save("profile", user);

    window.location.replace("/profile/");
  }
}
