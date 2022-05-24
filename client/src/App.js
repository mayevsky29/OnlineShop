import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/navbar';
import { NoMatch } from './components/no-match/no-match';
import Loading from './components/Loading';
import Notification from './components/Notification';
import Login from './components/user/Login';

function App() {
  return (
    <>
      <Header />
      <Loading />
      <Notification />
      <Login />
    </>
  );
  //return (
  
  
  //  <Routes>
  //      <Route path="/" element={<Header />}>
  //      <Route path="loading" element={<Loading />} />
  //      <Route path="notification" element={<Notification />} />
  //      <Route path="login" element={<Login />} />
  //        <Route path="*" element={<NoMatch />} />
  //      </Route>
  //    </Routes>
  //);
};

export default App;
