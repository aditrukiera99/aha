import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/login");
  });

  return <div></div>;
};

export default Home;
