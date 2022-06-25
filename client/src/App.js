import './App.css';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import { lazy, Suspense } from 'react';

const Register = lazy(() => import("./components/auth/Register/index"));
const Login = lazy(() => import("./components/auth/Login/index"));



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/register"
            element={
              <Suspense>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
        </Route>
      </Routes>
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
