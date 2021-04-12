// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//user
const USER = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//videos
const VIDEO = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

//github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  user: USER,
  userDetail: (id) => (id ? `/users/${id}` : USER_DETAIL),
  // userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  video: VIDEO,
  upload: UPLOAD,
  videoDetail: (id) => (id ? `/videos/${id}` : VIDEO_DETAIL),
  editVideo: (id) => (id ? `/videos/${id}/edit` : EDIT_VIDEO),
  deleteVideo: (id) => (id ? `/videos/${id}/delete` : DELETE_VIDEO),
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
};

export default routes;
