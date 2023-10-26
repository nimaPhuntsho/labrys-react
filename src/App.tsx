/* eslint-disable */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyTokens from "./MyTokens";
import Home from "./Home";

export interface FavouriteToken {
  id: number;
  symbol: string;
  price: number;
  percent_change_1h: number;
  market_cap: number;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="mytokens" element={<MyTokens />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
