import { useEffect, useState } from "react";

function Hhome() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/home")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message || "Loading..."}</h1>
    </div>
  );
}

export default Hhome;
