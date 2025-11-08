import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./userSlice";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Zap } from "lucide-react";

const LoginPage = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    try {
      const data = await login({
        email: formData.get("email"),
        password: formData.get("password"),
      }).unwrap();

      if (data?.user) {
        dispatch(setUser(data.user));
      }

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-full items-center">
      <div className="flex flex-col w-full max-w-md items-center m-auto space-y-8">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/30 mb-4 animate-scale-in">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p>Login to your EV Account</p>
        </div>
        <div className="card animate-slide-up w-full !px-8 !py-12">
          {isError && (
            <div className="flex items-center bg-red-100 border border-red-200 rounded mb-6 p-4 gap-2">
              <ShieldAlert className="h-6 w-6 animate-pulse text-red-700" />
              <p className="text-red-700 text-sm">: {error.data.error}</p>
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex-1 w-full">
                <label
                  htmlFor="email"
                  className="text-slate-800 mb-2 block font-semibold"
                >
                  Email Address
                </label>
                <div className="relative w-full">
                  <div className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    className="w-full pl-12 border border-slate-600 rounded pr-4 py-3 text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-slate-600 focus:border-slate-800"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-slate-800 mb-2 block font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400">
                    <Lock className="h-6 w-6" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="some secret"
                    className="w-full pl-12 border border-slate-600 rounded pr-4 py-3 text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-semibold focus:outline-none focus:border-slate-600 focus:border-slate-800"
                  />

                  <div>
                    {showPassword ? (
                      <Eye
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember" className="text-slate-800 text-sm">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  className="text-green-700 cursor-pointer text-sm font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="btn-primary !w-[95%] !m-auto !py-3 !rounded cursor-pointer !text-lg"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-3 size-5 animate-spin ..."
                      viewBox="0 0 24 24"
                    ></svg>
                    {"Processing..."}
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>

          <div className="text-sm text-slate-600 mt-6 w-full text-center">
            Dont have an Account?{" "}
            <button
              type=""
              className="font-semibold text-green-700 cursor-pointer"
            >
              Sign-up
            </button>
          </div>
        </div>
        <div className="text-sm text-slate-600 mt-6 w-full text-center animate-fade-in">
          &copy; Dullat:Ev-project, All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
