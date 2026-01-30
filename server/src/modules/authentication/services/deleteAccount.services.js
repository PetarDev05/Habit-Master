import User from "../models/user.models.js";
import eventBus from "../../../events/eventBus.events.js";
import { EVENTS } from "../../../events/eventTypes.events.js";

export const deleteUserAccount = async (userId) => {
  await User.deleteUserAccount(userId);
  eventBus.emit(EVENTS.USER_DELETED, { userId });
};
