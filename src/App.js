// import logo from './logo.svg';
import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import './App.css';
import Analytics from './components/Analytics';
import Dashboard from './components/Dashboard';
import AllExpenditures from './components/ExpendituresData';
import Footer from './components/footer';
import Header from './components/header';
import store from './store/store';
import CricketAccessories from './components/CricketAccessories';
function App(user) {
  return (
    <Provider store={store}>
    
   
  <div className="App">
  <HashRouter>
  <Header user={user}/>
  <Container maxWidth="lg" sx={{
    mt : 5,
    mb: 25,
    height: '100vh'
}}>
      <Routes>
      <Route index path="/" element={<Dashboard />} />
        <Route path="/CricketAccessories" element={<CricketAccessories />} />
        <Route path="/analysis" element={<Analytics />} />

      </Routes>
     
      </Container>
  

    </HashRouter>
    </div>
    <Footer />
    </Provider>
  );
}

export default withAuthenticator(App);
