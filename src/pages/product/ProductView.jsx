import React from "react";
import "./StyleProduct.scss";
import { Link } from "react-router-dom";

export default function ProductView({ data }) {
  try {
    return (
      <div className="flex justify-center pt-12">
        <div className="grid grid-cols-3 gap-4">
          {data.map((data, index) => {
            return (
              <div
                className="card bg-base-100 w-full h-[500px] shadow-xl"
                key={index}
              >
                <img
                  src={data.image}
                  alt="Shoes"
                  className="object-contain w-full h-[120px]"
                />
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">{data.title}</h2>
                  <p className="line-clamp-3">{data.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={"/detail-product/" + data.id}
                      className="btn btn-primary"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
