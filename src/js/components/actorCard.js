import { PROFILE_BASE_URL } from "../constants";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";

export function createActorCard(actor) {
  return `
   <div class="actor-card">
    <img class="actor-card-img" src="${actor.profile_path ? PROFILE_BASE_URL + actor.profile_path : avatarPlaceholder}" alt="${actor.name}" />
    <p class="actor-card-name">${actor.name}</p>
   </div>
  `;
}
