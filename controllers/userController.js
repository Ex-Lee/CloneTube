import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("getJoin", { pageName: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("getJoin", { pageName: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageName: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  // To Do Process Log Out
  res.redirect(routes.home);
  // res.render("logout", { pageName: "Logout" });
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageName: "User Detail" });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageName: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageName: "Change Password" });
