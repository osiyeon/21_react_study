import { Route, Switch, Redirect } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
    return (
        <div>
            <MainHeader />
            <main>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/welcome" />
                    </Route>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                    <Route path="/products" exact>
                        <Products />
                    </Route>
                    <Route path="/products/:productId">
                        <ProductDetail />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;

// our-domain.com/ => Component A
// our-domain.com/products => Component B

// our-domain.com/welcome url을 가지면 위에 <Route path="/welcome" /> 실행됨
// our-domain.com/products => Products Component
// our-domain.com/product-detail/<any-value>
