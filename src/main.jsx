import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";

import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout.jsx";
import Map from "./pages/Map.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./features/user/LoginPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Map />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
