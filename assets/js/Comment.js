import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentEditBtn = document.querySelectorAll(".jsCommentEditBtn");
const commentDeleteBtn = document.querySelectorAll(".jsCommentDeleteBtn");

let selectIndex;

// Common Function
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const getIndex = (event) => {
  const parent = event.path[4].childNodes;
  const children = event.path[3];
  let returnIndex;
  parent.forEach((element, index) => {
    if (element === children) {
      returnIndex = index;
    }
  });
  return returnIndex;
};

const getNowDate = () => {
  const nowDate = new Date(Date.now());
  console.log();
  const year = nowDate.getFullYear();
  const month =
    nowDate.getMonth() < 10 ? `0${nowDate.getMonth()}` : nowDate.getMonth();
  const day =
    nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate();
  return `작성일 ${year}-${month}-${day}`;
};

/************************************************** Add Comment **************************************************/

const frontEndAddComment = (comment, name, avatar) => {
  const commentDiv = document.createElement("div");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const nameDiv = document.createElement("div");
  const nameChildDiv = document.createElement("div");
  const textDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const avatarDiv = document.createElement("div");
  const avatarImg = document.createElement("img");
  const editAnchor = document.createElement("a");
  const deleteAnchor = document.createElement("a");

  editAnchor.innerHTML = '<i class="fas fa-edit"></i>';
  deleteAnchor.innerHTML = '<i class="fas fa-times"></i>';

  editAnchor.className = "jsCommentEditBtn";
  deleteAnchor.className = "jsDeleteEditBtn";

  // eslint-disable-next-line no-use-before-define
  editAnchor.addEventListener("click", handleEdit); // edit submit 추가
  // eslint-disable-next-line no-use-before-define
  deleteAnchor.addEventListener("click", handleDelComment); // delete submit 추가

  commentDiv.id = "commentDiv";

  span.innerHTML = comment;
  nameChildDiv.innerHTML = name;
  dateDiv.innerHTML = getNowDate();
  avatarImg.src = avatar;

  nameDiv.className = "video__comments-name";
  textDiv.className = "video__comments-text";
  avatarDiv.className = "video__comments-avatar";

  li.appendChild(span);

  nameDiv.appendChild(nameChildDiv);
  nameDiv.appendChild(dateDiv);

  textDiv.appendChild(li);
  textDiv.appendChild(editAnchor);
  textDiv.appendChild(deleteAnchor);

  avatarDiv.appendChild(avatarImg);

  commentDiv.appendChild(avatarDiv);
  commentDiv.appendChild(nameDiv);
  commentDiv.appendChild(textDiv);
  commentList.prepend(commentDiv);
  increaseNumber();
};

const addComment = async (comment, name, avatar) => {
  const getId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${getId}/add_comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    frontEndAddComment(comment, name, avatar);
  }
};

const handleAddComment = (event) => {
  event.preventDefault();
  const commentInput = document.getElementById("jsCommentText");
  const commentName = document.getElementById("jsCommentNameHidden");
  const commentAvatar = document.getElementById("jsCommentAvatarHidden");

  const comment = commentInput.value;
  const name = commentName.value;
  const avatar = commentAvatar.value;
  addComment(comment, name, avatar);
  commentInput.value = "";
};

/************************************************** Add Comment **************************************************/

/************************************************** Edit Comment *************************************************/

const frontEndEditComment = (comment) => {
  const selectChild = commentList.childNodes[selectIndex].querySelector(
    ".video__comments-text"
  );
  const span = document.createElement("span");
  const li = document.createElement("li");
  span.innerHTML = comment;
  li.appendChild(span);
  selectChild.replaceChild(li, selectChild.querySelector("form"));
};

const editComment = async (comment, index) => {
  const getId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${getId}/edit_comment`,
    method: "POST",
    data: {
      comment,
      index,
    },
  });
  if (response.status === 200) {
    frontEndEditComment(comment);
  }
};

const handleEditSubmit = (event) => {
  event.preventDefault();

  const editText = document.getElementById("editText");
  const editTextValue = editText.value;
  editComment(editTextValue, selectIndex);
};

const handleEdit = (event) => {
  const selectComment = event.path[2];

  selectIndex = getIndex(event);

  const editForm = document.createElement("form");
  const editInput = document.createElement("input");

  editInput.setAttribute("type", "text");
  editInput.setAttribute("id", "editText");

  editForm.appendChild(editInput);
  selectComment.replaceChild(editForm, event.path[2].querySelector("li"));
  editForm.querySelector("input").focus();
  editForm.addEventListener("submit", handleEditSubmit);
};

/************************************************** Edit Comment *************************************************/

/************************************************* Detele Comment ************************************************/

const frontEndDeleteComment = () => {
  const selectChild = commentList.childNodes[selectIndex];
  selectChild.remove();
  decreaseNumber();
};

const handleDelComment = async (event) => {
  event.preventDefault();

  selectIndex = getIndex(event);
  const getId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${getId}/delete_comment`,
    method: "POST",
    data: {
      index: selectIndex,
    },
  });
  if (response.status === 200) {
    frontEndDeleteComment(selectIndex);
  }
};

/************************************************* Detele Comment ************************************************/

/****************************************************** Init *****************************************************/

const init = () => {
  addCommentForm.addEventListener("submit", handleAddComment);
  commentEditBtn.forEach((element) => {
    element.addEventListener("click", handleEdit);
  });
  commentDeleteBtn.forEach((element) => {
    element.addEventListener("click", handleDelComment);
  });
};

if (addCommentForm) {
  init();
}

/****************************************************** Init *****************************************************/
