const KEY = "posts";

export const getPosts = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const savePosts = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));

export const initPosts = (defaultData) => {
  if (!localStorage.getItem(KEY)) {
    savePosts(defaultData);
  }
};

export const addPost = (post) => {
  const data = getPosts();
  data.push(post);
  savePosts(data);
};

export const updatePost = (post) => {
  const data = getPosts().map(p =>
    p.id === post.id ? post : p
  );
  savePosts(data);
};

export const deletePost = (id) => {
  const data = getPosts().filter(p => p.id !== id);
  savePosts(data);
};