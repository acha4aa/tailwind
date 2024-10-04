import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./assets/stylebaru.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/beranda/Beranda";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import Product from "./pages/product/Product";
import DetailProduct from "./pages/DetailProduct";
import Countries from "./pages/countries/Countries";
import DetailCountries from "./pages/DetailCountries";
import ThemeContext from "./components/context/ThemeContext";

function App() {
  const [count, setCount] = useState(0);
  const theme = useState("light");

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/detail-countries/:id" element={<DetailCountries />} />
          <Route path="*" element={<Error />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </ThemeContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
