import React, { useEffect, useState } from "react";
import { instance } from "../api";

const Home = () => {
  const [foods, setFoods] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("/foods");
      setFoods(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      {JSON.stringify(foods, null, 2)}
    </div>
  );
};

export default Home;
