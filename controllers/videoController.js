import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageName: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageName: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  let videos = [];
  const {
    query: { term: searchingBy },
  } = req;
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(videos);
  res.render("search", { pageName: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageName: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageName: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id).populate("creator");

    if (video.creator.id !== req.user.id) {
      throw Error;
    } else {
      res.render("editVideo", { pageName: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, description },
    } = req;
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error;
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const registerView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      name: user.name,
      avatarUrl: `${user.avatarUrl}`,
    });
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postEditComment = async (req, res) => {
  const {
    params: { id },
    body: { comment, index },
  } = req;

  try {
    const video = await Video.findById(id);
    const reverseArr = video.comments.reverse();
    const selectComment = await Comment.findById(reverseArr[index]);
    selectComment.text = comment;
    selectComment.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id: videoId },
    body: { index },
  } = req;

  try {
    const video = await Video.findById(videoId);
    const reverseArr = [...video.comments].reverse();
    const selectComment = await Comment.findById({ _id: reverseArr[index] });
    reverseArr.splice(index, 1);
    video.comments = [...reverseArr].reverse();
    selectComment.delete();
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
