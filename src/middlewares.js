import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "CloneTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "clonetube-jsproject/video",
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "clonetube-jsproject/avatar",
  }),
});

// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });

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
export const uploadAvatar = multerAvatar.single("avatar");
