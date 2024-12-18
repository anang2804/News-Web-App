export const saveArticle = (article) => {
  return {
    type: "SAVE_ARTICLE",
    payload: article,
  };
};

export const unsaveArticle = (article) => {
  return {
    type: "UNSAVE_ARTICLE",
    payload: article,
  };
};
