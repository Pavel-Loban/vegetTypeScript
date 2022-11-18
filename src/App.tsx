import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.scss';
import Footer from "./Components/Footer/Footer";
import Navigation from "./Components/Navigation/Navigation";

import Nuts from "./pages/nuts/nuts";
import Vegetables from "./pages/vegetables/vegetables/vegetables";
import Home from "./pages/home/home";
import Fruits from "./pages/fruits/fruits";
import Beverage from "./pages/beverage/beverage";
import EggsDairy from "./pages/eggs&dairy/eggs&dairy";
import EggsDairyItem from "./pages/eggs&dairy/eggsDairyItem/eggsDairyItem";
import PageNotFound from "./pages/pageNotFound/pageNotFound";
import VegetablesItem from "./pages/vegetables/vegetableItem/vegetablesItem";
import NutItem from "./pages/nuts/nutItem/nutItem";
import BeverageItem from "./pages/beverage/beverageItem/beverageItem";
import FruitItem from "./pages/fruits/fruitItem/fruitItem";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
// import LoginPage from "pages/Login/LoginPage";
// import RegisterPage from "pages/Register/RegisterPage";
import {useAuth} from './hooks/use-auth';


function App() {
  const {isAuth} = useAuth();




  return   (
    <Router>

      <div className="App">
       {/* {isAuth ? <Navigation /> : ''} */}
       <Navigation />
      <div className='content'>
      <Routes >

      {/* <Route path="/login" element={<LoginPage /> }  /> */}
      {/* <Route path="/register" element={<RegisterPage /> }  /> */}
        <Route  path="/" element={<Home /> }  />

        <Route path="/nuts" element={<Nuts /> } />
        {/* <Route path="/nuts/:id" element={<NutItem /> } /> */}

        {/* <Route path="/vegetables" element={<Vegetables  /> } /> */}
        {/* <Route path="/vegetables/:id" element={<VegetablesItem /> } /> */}

        {/* <Route path="/fruits" element={<Fruits  /> } /> */}
        {/* <Route path="/fruits/:id" element={<FruitItem /> } /> */}

        <Route path="/beverages" element={<Beverage  /> } />
        {/* <Route path="/beverages/:id" element={<BeverageItem /> } /> */}

        {/* <Route path="/eggs&dairy" element={<EggsDairy  /> } /> */}
        {/* <Route path="/eggs&dairy/:id" element={<EggsDairyItem /> } /> */}

        <Route path="/404" element={<PageNotFound /> } />
        <Route path="*" element={<Navigate replace to='/404' /> } />

        <Route path="/shoppingCart" element={<ShoppingCart  /> } />

      </Routes>
      </div>
      { isAuth ? <Footer/> : ''}
      <Footer/>
      </div>
    </Router>
  );

}

export default App;
