const initialState = {
  savedArticles: [],
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ARTICLE":
      return {
        ...state,
        savedArticles: [...state.savedArticles, action.payload],
      };
    case "UNSAVE_ARTICLE":
      return {
        ...state,
        savedArticles: state.savedArticles.filter(
          (article) => article.web_url !== action.payload.web_url
        ),
      };
    default:
      return state;
  }
};

export default savedReducer;
