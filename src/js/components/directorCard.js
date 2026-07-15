import { PROFILE_BASE_URL } from "../constants";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";

export function createDirectorCard(director, title) {
  return `
    <div class="director-card">
    <h2>${title}</h2>
    <img class="director-card-img" src="${director.profile_path ? PROFILE_BASE_URL + director.profile_path : avatarPlaceholder}" alt="${director.name}" />
    <p class="director-card-name">${director.name}</p>
    </div>
    `;
}
