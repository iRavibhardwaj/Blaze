import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/sideimg.png"
        alt="side-img"
        className="hidden lg:block h-screen w-1/2 xl:w-7/12 object-cover bg-no-repeat"
      />
    </>
  );
};

export default AuthLayout;
