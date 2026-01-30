import eventBus from "../../../events/eventBus.events.js";
import { EVENTS } from "../../../events/eventTypes.events.js";
import { deleteUserData } from "../services/deleteUserData.services.js";

eventBus.on(EVENTS.USER_DELETED, async ({ userId }) => {
  await deleteUserData(userId);
  console.log("DATA MODULE: USER DATA DELETED SUCCESSFULLY");
});
