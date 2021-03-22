import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "CloneTube";
  res.locals.routes = routes;
  next();
};
