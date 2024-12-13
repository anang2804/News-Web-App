import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveArticle } from "../redux/savedSlice";

function Indonesia() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  const handleSave = (article) => {
    saveArticle(article);
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          `${BASE_URL}?q=indonesia&api-key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Gagal memuat data.");
        }
        const result = await response.json();
        setArticles(result.response.docs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Memuat...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Berita Indonesia</h1>
      <div className="row">
        {articles.map((article) => (
          <div key={article.web_url} className="col-md-4 mb-4">
            <div className="card border rounded shadow-sm h-100">
              <img
                src={
                  article.multimedia?.length
                    ? `https://www.nytimes.com/${article.multimedia[0].url}`
                    : "https://via.placeholder.com/200"
                }
                className="card-img-top"
                alt={article.headline?.main || "Gambar Berita"}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">
                  {article.headline?.main}
                </h5>
                <p className="card-text text-muted">{article.abstract}</p>

                <div className="mt-auto">
                  <a
                    href={article.web_url}
                    className="btn btn-outline-primary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Baca Selengkapnya
                  </a>

                  <button
                    className="btn btn-secondary btn-sm ms-2"
                    onClick={() => {
                      handleSave(article);
                    }}
                  >
                    Simpan
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

export default Indonesia;
