import { useRouter } from "next/router";
import React from "react";
import { IDashboardRoute } from "../../../routes";

export const SideBar = (
  routes: Array<IDashboardRoute>,
  parentSlug: string,
  currentRole: string
) => {
  const router = useRouter();
  let haveChild = "";
  let icon = null;
  const routeArr = router.asPath.split("/").filter((path) => path);

  const redirectToPage = (route: IDashboardRoute) => {
    // router.push(parentSlug + route.url)
    router.push(
      {
        pathname: parentSlug + route.url,
        // query: { sortBy: 'price' },
      },
      undefined,
      { shallow: true }
    );
  };

  const listItemRenderer = (route: IDashboardRoute, index: number) => {
    if (
      route.isSidebarRendered &&
      route.roles.find((role) => role === currentRole)
    ) {
      haveChild =
        route.childrens != null
          ? "parentLink flex flex-col items-start w-full"
          : "flex flex-row w-full";

      const splitUrl = (parentSlug + route.url).split("/").filter((url) => url);

      const isMatch = splitUrl.every((url, index) => {
        if (url.includes(":")) return true;
        else return url === routeArr[index];
      });

      let buttonCLass = isMatch ? "active" : "";
      icon = isMatch ? route.iconActive ?? route.icon : route.icon;
      buttonCLass += route.soon ? " soon" : "";

      return (
        <li className={haveChild} key={index}>
          <button className={buttonCLass} onClick={() => redirectToPage(route)}>
            {icon}
            <div>{route.title}</div>
          </button>
          {route.childrens && SideBar(route.childrens, parentSlug, currentRole)}
        </li>
      );
    }
  };
  return (
    <ul className="flex flex-col w-full">
      {routes.map((route, index) => listItemRenderer(route, index))}
    </ul>
  );
};
