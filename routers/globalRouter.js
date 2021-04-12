import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  postKakaoLogin,
  getMe,
  kakaoLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate, kakaoJoinReset } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, kakaoJoinReset, home);

globalRouter.get(routes.join, kakaoJoinReset, onlyPublic, getJoin);

globalRouter.post(routes.join, kakaoJoinReset, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, kakaoJoinReset, onlyPublic, getLogin);

globalRouter.post(routes.login, kakaoJoinReset, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.post(routes.logout, home);

globalRouter.get(routes.search, kakaoJoinReset, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/join" }),
  postKakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
