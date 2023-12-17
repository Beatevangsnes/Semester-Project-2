// Assuming the file name is editProfile.mjs
import { getProfile } from "../../api/profiles/read.mjs";
import { updateAvatar } from "../../api/profiles/update.mjs";

async function loadProfileData() {
  try {
    const userProfile = await getProfile();
    displayProfileData(userProfile);
    setupAvatarUpdateListener(); // Call setupAvatarUpdateListener after loading profile data
  } catch (error) {
    console.error("Error loading profile:", error);
    // Handle loading error
  }
}

function displayProfileData(profile) {
  const { name, email, avatar } = profile;

  const profileContent = document.getElementById("profileContent");

  profileContent.innerHTML = `
    <div class="card m-4">
      <div class="card">
        <div class="w-100 product">
          <div class="profile-image avatar online">
            <div class="w-80 mask mask-hexagon">
              <img id="avatarImage" src="${
                avatar ? avatar : "/dist/images/user2.png"
              }" alt="${name}" class="w-100 profile-image"/>
            </div>
          </div>
          <div class="profile-info p-4 text-center">
            <h3>${name}</h3>
            <h4>${email}</h4>
            <!-- Add any additional profile info here -->
          </div>
        </div>
      </div>
    </div>`;
}

function setupAvatarUpdateListener() {
  const avatarForm = document.getElementById("avatarForm");
  avatarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const avatarUrl = document.getElementById("avatarInput").value;
    try {
      const updatedProfile = await updateAvatar(avatarUrl);

      // Assuming that your updateAvatar API call returns the updated profile
      document.getElementById("avatarImage").src = updatedProfile.avatar;
    } catch (error) {
      console.error("Failed to update avatar:", error);
      // Handle update error
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProfileData();
});
