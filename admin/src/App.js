import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import { Redirect } from "react-router-dom";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>

        {user &&
          <>
            <Topbar />
            <div className="container">
              {/* <div className="others">
          other pages
        </div> */}
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newProduct">
                <NewProduct />
              </Route>
            </div>
          </>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
