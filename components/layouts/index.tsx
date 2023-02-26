import Image from "next/image";
import Router from "next/router";
import IconArrowInLeft from "../../public/icons/icon-box-arrow-in-left";
import dashboardRoutes, { Roles } from "../../routes";
import Header, { HeaderOnlyLogo, HeaderPublic } from "./header";
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
  Router.push("/login");
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

  const layoutLeftSided = () => {
    return (
      <div className="w-full align-middle flex justify-center p-0 items-stretch h-full sm:flex-row flex-col">
        <div className="grid grid-rows-[1fr_4fr_1fr] grid-flow-row sm:w-6/12 w-full mt-10">
          <HeaderOnlyLogo className="px-3 pt-6 justify-center" />
          <div className="" style={{ alignItems: "center" }}>
            {prop.children}
          </div>
          {/* <div className="text-center bottom-12 absolute sm:w-6/12 w-full">
            <div className='mb-5'>Supported by</div>
            <Brands />
          </div> */}
        </div>
        <div className="flex flex-col sm:w-6/12 w-full bg-gray-100 relative h-full sm:visible invisible">
          <div className="w-full absolute align-middle justify-center text-center">
            <Image
              src="/assets/images/bglogin.png"
              alt="Welcome"
              priority={false}
              layout="responsive"
              width="50"
              height="30"
              className="w-6/12 absolute"
            />
            <span style={{ color: "#FFF", fontSize: 24, fontWeight: 400 }}>
              The first Indonesia blockchain technology <br /> solution for data
              &amp; survey
            </span>
          </div>

          {/* <Image src="/assets/images/welcome-bg.png" alt="Welcome" priority={false} layout="fill" /> */}
        </div>
      </div>
    );
  };

  const layoutLeftSidedRegister = () => {
    return (
      <div className="w-full justify-center p-0 h-full flex sm:flex-row flex-col overflow-auto">
        <div className="sm:w-8/12 w-full mt-10 sm:px-20 px-1 h-full">
          <HeaderOnlyLogo className="justify-center" />
          <div className="sm:mt-10 mt-10" style={{ alignItems: "center" }}>
            {prop.children}
          </div>
          {/* <div className="text-center sm:block hidden">
            <div className='mb-5'>Supported by</div>
            <Brands />
          </div> */}
        </div>
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

  const layoutHeaderPublic = () => {
    return (
      <div className="pageBase flex-wrap flex-col">
        <HeaderPublic title={prop.headerTitle}></HeaderPublic>
        {prop.children}
      </div>
    );
  };

  switch (prop.layout) {
    case "leftBlank":
      return leftBlankHeader();
    case "withHeader":
      return layoutWithHeader();
    case "leftSided":
      return layoutLeftSided();
    case "leftSidedRegister":
      return layoutLeftSidedRegister();
    case "layoutHeaderPublic":
      return layoutHeaderPublic();
    default:
      return layoutBlank();
  }
};
