import { Outlet } from "react-router-dom";
import useAuthInitializer from "../services/useAuthInitializer";

const RootLayout = () => {
  useAuthInitializer();
  return (
    <>
      <div className={`h-screen flex flex-col`}>
        <header>this is header</header>
        <div className={`flex-1`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
