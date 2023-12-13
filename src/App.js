import React, { useState, useEffect } from 'react';
import Home from './Home';
import Footer from './components/Footer';
import Header from './components/Header';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Navigate,
} from 'react-router-dom';
import Cart from './pages/Cart';
import { productsData } from './api/Api';
import Product from './components/product';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Banner from './components/Banner';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from './firebase.config';
import Profile from './pages/Profile';
const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  <ToastContainer
    position='top-left'
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    Draggable
    pauseOnHovertheme='dark'
  />;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/registration',
          element: <Registration />,
        },
        {
          path: '/',
          element: <Home />,
          loader: productsData,
        },

        {
          path: '/product/:id',
          element: <Product />,
        },

        {
          path: '/cart',
          element: user && user.uid ? <Cart /> : <Navigate to='/login' />,
        },

        {
          path: '/profile',
          element: user && user.uid ? <Profile /> : <Navigate to='/login' />,
        },
        {
          path: '/banner',
          element: user && user.uid ? <Banner /> : <Navigate to='/login' />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
