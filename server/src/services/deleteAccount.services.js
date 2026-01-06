import User from "../models/user.models.js";

export const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
  // dodaj logiku za brisanje svih dokumenata za weeks, habits, check-ins
};

// ili napravi logiku da svako brisanje dokumenata ima svoj servis