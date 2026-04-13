import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Aptech = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/contact", { replace: true });
  }, [navigate]);

  return null;
};

export default Aptech;
