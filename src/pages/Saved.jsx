import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function Saved() {
  // masoh bingung buat save
  const savedNews = useSelector((state) => state.saved);

  return (
    <div>
      <pre>{JSON.stringify(savedNews, null, 2)}</pre>
    </div>
  ); //
}

export default Saved;
