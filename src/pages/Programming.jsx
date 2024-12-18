import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle } from "../store/redux/action/savedActions";
import "bootstrap/dist/css/bootstrap.min.css";

function Programming() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.savedArticles || []);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  // Fungsi untuk menyimpan artikel
  const handleSave = (article) => {
    dispatch(saveArticle(article));
  };

  useEffect(() => {
    const fetchProgrammingNews = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?q=Programming&api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API.");
        }
        const data = await response.json();
        setArticles(data.response.docs);
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

  if (articles.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>Tidak ada artikel untuk ditampilkan.</p>
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
                      onClick={() => handleSave(article)}
                    >
                      {isSaved ? "Saved" : "Save"}
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
