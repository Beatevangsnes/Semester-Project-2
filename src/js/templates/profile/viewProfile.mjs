import { getProfile } from "../../api/profiles/read.mjs";

export async function viewProfile() {
  try {
    const profile = await getProfile();
    renderProfile("#profile", profile);
    console.log(profile);
  } catch (error) {
    console.log(error);
  }
}

export function renderProfile(container, profile) {
  const { name, email, avatar, credits, listings } = profile;

  const profileContainer = document.querySelector(container);

  profileContainer.innerHTML = `
    <div class="card m-4">
        <div class="card">
            <div class="w-100 product">
                <div class="profile-image avatar online">
                <div class="w-80 mask mask-hexagon">
                <img src="${
                  avatar ? avatar : "/images/user2.png"
                }" alt="${name}" class="w-100 profile-image"/>
            </div>
                </div>
                <div class="profile-info p-4 text-center">
                    <h3 class="">${name}</h3>
                    <h4>${email}</h4>
                    <h4>Total Credits: ${credits}</h4>
                </div>
                <div class="edit-button text-center">
                  <a href="/profile/edit">Edit profile</a>
                </div>
            </div>
        </div>
    </div>`;
}
