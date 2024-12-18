import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { saveArticle, unsaveArticle } from "../store/redux/action/savedActions";

function Indonesia() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.savedArticles || []);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}?q=indonesia&api-key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Gagal memuat data.");
        const result = await response.json();
        setArticles(result.response.docs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [API_KEY, BASE_URL]);

  if (loading) return <p className="text-center mt-5">Memuat...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Berita Indonesia</h1>
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
                    {article.headline?.main || "Judul Tidak Tersedia"}
                  </h5>
                  <p className="card-text text-muted">
                    {article.abstract || "Deskripsi tidak tersedia."}
                  </p>
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
                      className={`btn ${
                        isSaved ? "btn-danger" : "btn-success"
                      } btn-sm ms-2`}
                      onClick={() =>
                        isSaved
                          ? dispatch(unsaveArticle(article))
                          : dispatch(saveArticle(article))
                      }
                    >
                      {isSaved ? "Unsave" : "Simpan"}
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

export default Indonesia;
