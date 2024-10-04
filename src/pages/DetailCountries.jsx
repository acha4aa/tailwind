import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailProduct() {
  const { id } = useParams();
  const [data, setData] = useState();
  const ambilData = async () => {
    const response = await axios.get("https://freetestapi.com/api/v1/countries/" + id);
    const data = await response.data;
    setData(data);
  };

  useEffect(() => {
    ambilData();
  }, []);

  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center space-y-8 flex-col">
          <img
            src={data?.flag}
            className="max-w-sm rounded-lg shadow-2xl mt-10"
          />
          <div>
            <h1 className="text-5xl font-bold">{data?.name}</h1>
            <p className="py-6 max-w-[50rem] text-center">
              {data?.currency}
            </p>
            <Link to="/" className="btn btn-outline" mb-10>
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
