import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [resto, setResto] = useState();
  const ambilResto = async () => {
    const response = await axios.get(
      "https://restaurant-api.dicoding.dev/detail/" + id
    );
    const data = await response.data;
    setResto(data);
  };

  useEffect(() => {
    ambilResto();
  }, []);

  useEffect(() => {
    console.log(resto);
  }, [resto]);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center space-y-8 flex-col">
          <img
            src={`https://restaurant-api.dicoding.dev/images/large/${resto?.restaurant.pictureId}`}
            className="max-w-sm rounded-lg shadow-2xl mt-10"
          />
          <div>
            <h1 className="text-5xl font-bold">{resto?.restaurant?.name}</h1>
            <p className="py-6 max-w-[50rem] text-justify">
              {resto?.restaurant?.description}
            </p>
            <Link to="/" className="btn btn-primary  mb-10">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
