import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";

// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <ProductDetails />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },

  {
    path: "/signup",
    element: (
      <PublicRoutes>
        <SignUp />
      </PublicRoutes>
    ),
  },

  // Optional: Handle unknown routes
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
