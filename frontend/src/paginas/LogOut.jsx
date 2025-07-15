import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/logout', { method: 'POST', credentials: 'include' })
      .then(() => {
        navigate('/');
      });
  }, [navigate]);

  return <p>Saindo...</p>;
}