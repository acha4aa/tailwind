import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import CountriesView from "./CountriesView";

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

const Countries = () => {
  const [state, dispatch] = useReducer(reducer, nilaiDefault);

  const [cari, setCari] = useSearchParams();
  const dataSearch = cari.get("datasearch"); //cariproduct

  const ambilResto = async () => {
    const response = await axios.get(
      "https://freetestapi.com/api/v1/countries"
    );
    const data = await response.data;

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
        "https://freetestapi.com/api/v1/countries?search=" + dataSearch
      );
      const data = await response.data;
      // setHasilSearch(data);

      dispatch({ type: "SET_FILTER", payload: data });
    },
    [dataSearch]
  );

  const hasilFilter = dataSearch ? state.filterData : state.data;

  return (
    <CountriesView
      dataSearch={dataSearch}
      hasilSearch={state.filterData}
      hasilFilter={state.filterData}
      gantiSearch={gantiSearch}
    />
  );
};

export default Countries;
