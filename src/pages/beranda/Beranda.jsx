import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BerandaView from "./BerandaView";
import { useCallback } from "react";
import { data } from "autoprefixer";

const nilaiDefault = {
  data: [],
  filterData: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BERHASIL":
      return {
        ...state,
        data: action.payload,
        filterData: action.payload,
        loading: false,
      };
    case "SET_FILTER":
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      throw new Error("error di case");
  }
};

const Beranda = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);

  // const [resto, setResto] = useState();
  // const [hasilSearch, setHasilSearch] = useState();

  const [cari, setCari] = useSearchParams();
  const dataSearch = cari.get("datasearch"); //cariproduct

  const ambilResto = async () => {
    const response = await axios.get(
      "https://restaurant-api.dicoding.dev/list"
    );
    const data = await response.data;
    // setResto(data);
    dispatch({ type: "FETCH_BERHASIL", payload: data });
  };

  useEffect(() => {
    if (!dataSearch) {
      ambilResto();
    } else {
      gantiSearch(dataSearch);
    }
  }, [dataSearch]);

  const gantiSearch = useCallback(
    async (input) => {
      setCari({ datasearch: input });
      const response = await axios.get(
        "https://restaurant-api.dicoding.dev/search?q=" + dataSearch
      );
      const data = await response.data;
      // setHasilSearch(data);

      dispatch({ type: "SET_FILTER", payload: data });
    },
    [dataSearch]
  );

  const hasilFilter = dataSearch ? state.filterData : state.data;

  console.log(state);
  return (
    <BerandaView
      dataSearch={dataSearch}
      hasilSearch={state.filterData}
      hasilFilter={hasilFilter}
      gantiSearch={gantiSearch}
    />
  );
};
// return (
//   <div>
//     <label className="input input-bordered flex items-center gap-2">
//       <input
//         type="text"
//         className="grow"
//         placeholder="Search"
//         onChange={(input) => gantiSearch(input.target.value)}
//       />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 16 16"
//         fill="currentColor"
//         className="h-4 w-4 opacity-70"
//       >
//         <path
//           fillRule="evenodd"
//           d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </label>
//     <p>
//       Hasil Dari : {dataSearch}, ditemukan : {hasilSearch?.founded}
//     </p>

//     <div className="grid grid-cols-3">
//       {hasilFilter?.restaurants?.map((data) => (
//         <div className="" key={data?.name}>
//           <div className="card bg-base-100 w-96 shadow-xl">
//             <figure>
//               <img
//                 src={`https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}`}
//                 alt="Shoes"
//               />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{data.name}</h2>
//               <p className="line-clamp-3">{data.description}</p>
//               <div className="card-actions justify-end">
//                 <Link to={"/detail/" + data.id} className="btn btn-primary">
//                   Buy Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

export default Beranda;
