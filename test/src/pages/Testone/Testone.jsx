import axios from "axios";
import { React, useEffect, useState } from "react";
import "./Testone.css";

function Testone() {
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("https://picsum.photos/v2/list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  //use css only
  return (
    <div className="containerbox">
      <div className="fleximage">
        {data.map((item) => (
          <img
            key={item.id}
            src={item.download_url}
            alt={item.author}
            className="image"
          />
        ))}
      </div>
    </div>
  );
}
export default Testone;
