export const join = (req, res) => res.render("join", { pageName: "Join" });
export const login = (req, res) => res.render("login", { pageName: "Login" });
export const logout = (req, res) =>
  res.render("logout", { pageName: "Logout" });

export const user = (req, res) => res.render("user", { pageName: "User" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageName: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageName: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageName: "Change Password" });
