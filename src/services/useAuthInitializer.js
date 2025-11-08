import React from "react";
import { useRefreshQuery } from "../features/user/userApi";

const useAuthInitializer = () => {
  const { isFetching, isError } = useRefreshQuery();
  return { isFetching, isError };
};

export default useAuthInitializer;
