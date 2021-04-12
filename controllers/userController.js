import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("getJoin", { pageName: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2, kakaoId },
  } = req;
  console.log(kakaoId);
  if (password !== password2) {
    res.status(400);
    res.render("getJoin", { pageName: "Join" });
  } else {
    try {
      const findUser = await User.findOne({ email });
      if (findUser && kakaoId) {
        findUser.kakaoId = kakaoId;
        findUser.save();
      } else {
        const user = await User({ name, email, kakaoId });
        await User.register(user, password);
      }
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

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email, avatar_url: avatarUrl },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });

      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.join);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      kakao_account: {
        email,
        profile: { nickname: name, profile_image_url: avatarUrl },
      },
    },
  } = profile;
  try {
    const user = await User.findOne({ kakaoId: id });
    if (user) {
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    } else if (email) {
      const newUser = await User.create({
        email,
        name,
        kakaoId: id,
        avatarUrl,
      });
      console.log(newUser);
      return cb(null, newUser);
    } else {
      return cb(null, id);
    }
  } catch (error) {
    return cb(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageName: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageName: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageName: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageName: "Change Password" });
