import multer from "multer";
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "CloneTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

const multerVideo = multer({ dest: "uploads/videos/" });

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const kakaoJoinReset = (req, res, next) => {
  if (typeof req.user === "number") {
    req.logout();
  }
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
