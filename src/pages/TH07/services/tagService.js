const KEY = "tags";

export const getTags = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const saveTags = (tags) =>
  localStorage.setItem(KEY, JSON.stringify(tags));

export const addTag = (tag) => {
  const tags = getTags();
  if (!tags.includes(tag)) {
    tags.push(tag);
    saveTags(tags);
  }
};

export const deleteTag = (tag) => {
  const tags = getTags().filter(t => t !== tag);
  saveTags(tags);
};

export const updateTag = (oldTag, newTag) => {
  const tags = getTags().map(t =>
    t === oldTag ? newTag : t
  );
  saveTags(tags);
};