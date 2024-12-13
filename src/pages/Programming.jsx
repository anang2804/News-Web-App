import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Programming() {
  // State untuk artikel, status loading, dan error
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Key dan URL dasar untuk permintaan data
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  // Mengambil artikel "Programming" dari API saat komponen dimuat
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
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  // Handle ketika tidak ada artikel
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
        {articles.map((article) => (
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
                  <button className="btn btn-secondary btn-sm ms-2" disabled>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programming;
