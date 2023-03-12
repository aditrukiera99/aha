import Image from "next/image";
import Router from "next/router";
import IconArrowInLeft from "../../public/icons/icon-box-arrow-in-left";
import dashboardRoutes, { Roles } from "../../routes";
import Header from "./header";
import { SideBar } from "./sidebar";
// import { IconArrowInLeft } from "../../components/tools/icons/sidemenu";

interface layoutInterface {
  children: any;
  layout: string;
  parent: string;
  headerTitle?: string | null;
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

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  Router.push("/landing");
};

export const BaseLayout = (prop: layoutInterface): any => {
  //TODO: change with user roles from login
  const currentRole = Roles.ADMIN;

  const layoutWithHeader = () => {
    return (
      <div className="pageBase flex-wrap flex-col">
        <Header title={prop.headerTitle}></Header>
        <div className="flex flex-row">
          {/* LEFT SIDEBAR */}
          <div className="sidebar bg-white w-[17%] sticky top-0 left-0 scrollbar-hide -mt-16 sm:block hidden">
            <div className="mt-16">
              {SideBar(dashboardRoutes, prop.parent, currentRole)}
            </div>
            <ul className="absolute bottom-0 w-full flex flex-col">
              <li className="flex flex-row w-full">
                <button
                  className="ml-1"
                  onClick={() => {
                    logout();
                  }}
                >
                  <IconArrowInLeft />
                  <div className="">Logout</div>
                </button>
              </li>
            </ul>
          </div>
          {/* CONTENT */}
          <div className="innerPage sm:w-[83%] w-full px-6 py-4">
            {prop.children}
          </div>
        </div>
      </div>
    );
  };

  const layoutBlank = () => {
    return (
      <div className="pageBase flex-wrap flex-col">
        <div className="flex flex-row">{prop.children}</div>
      </div>
    );
  };

  const leftBlankHeader = () => {
    return (
      <div className="pageBase flex-wrap flex-col">
        <Header title={prop.headerTitle}></Header>
        {prop.children}
      </div>
    );
  };



  switch (prop.layout) {
    case "leftBlank":
      return leftBlankHeader();
    case "withHeader":
      return layoutWithHeader();
    default:
      return layoutBlank();
  }
};
