import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Pipes } from "../../../components/tools/pipes";

interface HeaderInterface {
  title?: string | null;
}

const redirectToNewPage = (url: string, isNewTab?: boolean, router?: any) => {
  if (isNewTab) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
    link.remove();
    return;
  }
};

const Header = (props: HeaderInterface) => {
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const router = useRouter();

  const [usernameAdmin, setUsernameAdmin] = useState<string | null>("");

  useEffect(() => {
    if (getToken === null || undefined) {
      router.push("/login");
    } else {
      setUsernameAdmin(localStorage.getItem("fullName"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-16 flex flex-wrap justify-between items-center bg-[#07124d] sticky w-full z-20 top-0">
      <div className="w-2/12 flex justify-center">
        <div
          className="bg-[url('../public/assets/images/logo.png')] bg-contain bg-no-repeat bg-center w-16 h-12 cursor-pointer"
          onClick={() =>
            redirectToNewPage(
              location.origin + "/office/list-survey",
              false,
              router
            )
          }
        />
      </div>
      {props.title != null && (
        <div className="title block w-5/12 mx-auto">
          <div className="text-xl font-bold text-ellipsis text-left text-chroma-white whitespace-nowrap overflow-hidden">
            {props.title}
          </div>
        </div>
      )}
      <div className="flex justify-center w-2/12 gap-4">
        <div className="flex text-center items-center">
          <span className="text-white w-8 h-8 rounded bg-gradient-to-tr from-[#1d21ff] to-[#52e2cb] pt-1">
            {Pipes.nameInitial(usernameAdmin)}
          </span>
        </div>
        <div className="flex items-center">
          <h1 className="text-white text-ellipsis whitespace-nowrap overflow-hidden font-bold text-sm">
            {usernameAdmin}
          </h1>
        </div>
      </div>
    </div>
  );
};

export const HeaderOnlyLogo = ({ className = "" }) => {
  const router = useRouter();
  return (
    <div className={"header bg-transparent " + className}>
      <div
        className="logo logo-blue cursor-pointer flex w-2/12"
        onClick={() => redirectToNewPage(location.origin, false, router)}
      />
    </div>
  );
};

export const HeaderPublic = (props: HeaderInterface) => {
  const router = useRouter();

  return (
    <div className="header sticky w-full z-20 top-0">
      <div className="w-2/12 flex self-center justify-center">
        <div
          className="logo cursor-pointer"
          onClick={() => redirectToNewPage(location.origin, false, router)}
        />
      </div>
      {props.title != null && (
        <div className="title block w-10/12 mx-auto">
          <div className="text-xl font-bold text-ellipsis text-left text-chroma-white whitespace-nowrap overflow-hidden">
            {props.title}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
