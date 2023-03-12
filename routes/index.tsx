import { ReactNode } from "react";
import {
  IconPersonVcard,
  IconHouse,
} from "../public/icons";

export enum Roles {
  ADMIN = "ADMIN",
}

export interface IDashboardRoute {
  url: string;
  parentUrl?: string;
  title?: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  isSidebarRendered: boolean;
  component?: ReactNode;
  childrens?: Array<IDashboardRoute>;
  roles: Array<Roles | string>;
  soon?: boolean;
}

const DashboardRoutes: Array<IDashboardRoute> = [

  {
    url: "/home",
    title: "Dashboard",
    isSidebarRendered: true,
    // component: <ListPage />,
    childrens: [
      {
        url: "/home",
        title: "Home",
        isSidebarRendered: true,
        icon: <IconHouse colorStart="#1F2432" colorStop="#1F2432" />,
        iconActive: <IconHouse />,
        roles: [Roles.ADMIN],
      },

      {
        url: "/profile",
        title: "Profile",
        isSidebarRendered: true,
        icon: <IconPersonVcard />,
        iconActive: <IconPersonVcard fill={true} />,
        roles: [Roles.ADMIN],
      },
    ],
    roles: [Roles.ADMIN],
  },

];

export default DashboardRoutes;
