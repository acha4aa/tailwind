import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailProduct() {
  const { id } = useParams();
  const [data, setData] = useState();
  const ambilData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products/" + id);
    const data = await response.data;
    setData(data);
  };

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center space-y-8 flex-col">
          <img
            src={data?.image}
            className="max-w-sm rounded-lg shadow-2xl mt-10"
          />
          <div>
            <h1 className="text-5xl font-bold">{data?.title}</h1>
            <p className="py-6 max-w-[50rem] text-justify">
              {data?.description}
            </p>
            <Link to="/" className="btn btn-primary  mb-10">
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
