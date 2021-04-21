import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${
        process.env.PRODUCTION === "true"
          ? `https://ancient-sands-57079.herokuapp.com${routes.githubCallback}`
          : `http://localhost:3000${routes.githubCallback}`
      }`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: `${
        process.env.PRODUCTION === "true"
          ? `https://ancient-sands-57079.herokuapp.com${routes.kakaoCallback}`
          : `http://localhost:3000${routes.kakaoCallback}`
      }`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
