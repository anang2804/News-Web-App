import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveArticle, unsaveArticle } from "../store/redux/action/savedActions";
import "bootstrap/dist/css/bootstrap.min.css";

function Programming() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.savedArticles || []);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  const handleSave = (article) => {
    dispatch(saveArticle(article));
  };

  const handleUnsave = (article) => {
    dispatch(unsaveArticle(article));
  };

  useEffect(() => {
    const fetchProgrammingNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: "Programming",
            "api-key": API_KEY,
          },
        });
        setArticles(response.data.response.docs);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammingNews();
  }, [API_KEY]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Programming News</h1>
      <div className="row">
        {articles.map((article) => {
          const isSaved = savedArticles.some(
            (saved) => saved.web_url === article.web_url
          );

          return (
            <div key={article.web_url} className="col-md-4 mb-4">
              <div className="card border rounded shadow-sm h-100">
                <img
                  src={
                    article.multimedia && article.multimedia.length > 0
                      ? `https://www.nytimes.com/${article.multimedia[0].url}`
                      : "https://via.placeholder.com/200"
                  }
                  className="card-img-top"
                  alt={article.headline.main || "News Image"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">
                    {article.headline.main}
                  </h5>
                  <p className="card-text text-muted">
                    {article.abstract || "No description available."}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={article.web_url}
                      className="btn btn-outline-primary btn-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read More
                    </a>
                    <button
                      className={`btn ${
                        isSaved ? "btn-danger" : "btn-success"
                      } btn-sm ms-2`}
                      onClick={() =>
                        isSaved ? handleUnsave(article) : handleSave(article)
                      }
                    >
                      {isSaved ? "Unsave" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Programming;
