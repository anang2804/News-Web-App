import { useDispatch, useSelector } from "react-redux";
import { unsaveArticle } from "../store/redux/action/savedActions";

function Saved() {
  const savedArticles = useSelector((state) => state.savedArticles || []);
  const dispatch = useDispatch();

  const handleUnsave = (article) => {
    dispatch(unsaveArticle(article));
  };

  if (savedArticles.length === 0) {
    return <p className="text-center mt-5">Tidak ada artikel yang disimpan.</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Artikel Tersimpan</h1>
      <div className="row">
        {savedArticles.map((article) => (
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
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "0.875rem" }}
                >
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
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleUnsave(article)}
                  >
                    Hapus
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

export default Saved;
