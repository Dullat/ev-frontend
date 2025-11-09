import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import useAuthInitializer from "../services/useAuthInitializer";

const RootLayout = () => {
  useAuthInitializer();
  return (
    <>
      <div className={`h-screen flex flex-col`}>
        <Header />
        <div className={`flex-1`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
