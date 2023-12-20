// import logo from './logo.svg';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CricketAccessories from './components/CricketAccessories';
import Dashboard from './components/Dashboard';
import FootBallAccessories from './components/FootBallAccessories';
// import Orders from './components/Orders';
import Footer from './components/footer';
import Header from './components/header';
import store from './store/store';
import Checkout from './components/PaypalGateWay';
import OrdersDetails from './components/Orders';
function App(user) {
  return (
    <Provider store={store}>
    
   
  <div className="App">
  <HashRouter>
  <Header user={user}/>
  <Container maxWidth="lg" sx={{
    mt : 5,
    mb: 10,
    height: '100%'
}}>
      <Routes>
      <Route index path="/" element={<Dashboard />} />
        <Route path="/CricketAccessories" element={<CricketAccessories />} />
        <Route path="/FootBallAccessories" element={<FootBallAccessories />} />
        <Route path="/cashCheckout" element={<Checkout />} />
        <Route path="/orderDetails" element={<OrdersDetails />} />

      </Routes>
     
      </Container>
  

    </HashRouter>
    </div>
    <Footer />
    </Provider>
  );
}

export default withAuthenticator(App);
