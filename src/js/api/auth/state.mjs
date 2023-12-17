import { load } from "../../storage/load.mjs";

export const isLoggedIn = () => Boolean(load("token"));

export const profile = () => load("profile");
