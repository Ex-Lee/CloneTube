export const home = (req, res) => res.render("home", { pageName: "Home" });
export const search = (req, res) =>
  res.render("search", { pageName: "Search" });

export const video = (req, res) => res.render("video", { pageName: "Video" });
export const upload = (req, res) =>
  res.render("upload", { pageName: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageName: "Video Detail" });
export const editVideo = (req, res) =>
  res.redner("editVideo", { pageName: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.redner("deleteVideo", { pageName: "Delete Video" });
