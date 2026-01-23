import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PleaseLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`flex h-full items-center justify-center`}>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-lg">You are not logged in</h1>
          <button
            className="btn-primary w-28"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default PleaseLogin;
