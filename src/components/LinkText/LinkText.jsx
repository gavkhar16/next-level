import { useNavigate } from "react-router-dom";
import "./LinkText.css";

export default function LinkText({ text, to }) {
  const navigate = useNavigate();

  return (
    <p className="link-text" onClick={() => navigate(to)}>
      {text}
    </p>
  );
}
