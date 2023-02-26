import { ReactNode } from "react";
import {
  IconTicket,
  IconPeople,
  IconPersonLines,
  IconStickies,
  IconCreditCard,
  IconCurrExchange,
  IconPersonVcard,
  IconHouse,
  IconCartFill,
  IconDiagram,
} from "../public/icons";
// import {
//   IconCreditCard,
//   IconHouse,
//   IconInboxes,
//   IconKanban,
//   IconPeople,
//   IconPie,
//   IconStar,
//   IconTeam,
// } from "../components/tools/icons/sidemenu";

export enum Roles {
  ADMIN = "ADMIN",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  MARKETING = "MARKETING",
  // sesuaikan dgn bisnis
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
    title: "Home",
    icon: <IconHouse colorStart="#1F2432" colorStop="#1F2432" />,
    iconActive: <IconHouse />,
    isSidebarRendered: true,
    // component: <DashboardPage />,
    roles: [Roles.ADMIN],
  },
  {
    url: "/home",
    title: "Data",
    isSidebarRendered: true,
    // component: <ListPage />,
    childrens: [
      {
        url: "/list-survey",
        title: "Surveys",
        isSidebarRendered: true,
        icon: <IconStickies />,
        iconActive: <IconStickies fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      {
        url: "/list-plan",
        title: "Plans",
        isSidebarRendered: true,
        icon: <IconCreditCard />,
        iconActive: <IconCreditCard fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      {
        url: "/list-respondent",
        title: "Respondents",
        isSidebarRendered: true,
        icon: <IconPeople />,
        iconActive: <IconPeople fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      {
        url: "/list-researcher",
        title: "Researchers",
        isSidebarRendered: true,
        icon: <IconPersonLines />,
        iconActive: <IconPersonLines fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      {
        url: "/purchases",
        title: "Purchases",
        isSidebarRendered: true,
        icon: <IconCartFill />,
        iconActive: <IconCartFill fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      {
        url: "/referrals",
        title: "Referrals",
        isSidebarRendered: true,
        icon: <IconDiagram />,
        iconActive: <IconDiagram fill={true} />,
        // component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
      },
      // {
      //   url: "/collection",
      //   title: "My Collection",
      //   isSidebarRendered: true,
      //   // icon: <IconStar></IconStar>,
      //   // component: <CreatePage />,
      //   roles: [Roles.ADMIN],
      //   soon: true,
      // },
      {
        url: "/master-data/:id/edit",
        title: "this is not rendered",
        isSidebarRendered: false,
        // icon: <IconStar></IconStar>,
        // component: <CreatePage />,
        roles: [Roles.ADMIN],
      },
      {
        url: "/master-data/:id/edit",
        title: "different roles not rendered",
        isSidebarRendered: false,
        // icon: <IconStar></IconStar>,
        // component: <CreatePage />,
        roles: [Roles.CUSTOMER_SERVICE],
      },
    ],
    roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
  },
  {
    url: "/setting",
    title: "Setting",
    isSidebarRendered: true,
    // component: <ListPage />,
    childrens: [
      {
        url: "/points",
        title: "Points",
        isSidebarRendered: true,
        icon: <IconCurrExchange />,
        iconActive: <IconCurrExchange fill={true} />,
        // component: <CreatePage />,
        roles: [Roles.ADMIN],
      },
      {
        url: "/vendor",
        title: "Vendors",
        isSidebarRendered: true,
        icon: <IconPersonVcard />,
        iconActive: <IconPersonVcard fill={true} />,
        // component: <CreatePage />,
        roles: [Roles.ADMIN],
      },
      {
        url: "/coupon",
        title: "Coupons",
        isSidebarRendered: true,
        icon: <IconTicket />,
        iconActive: <IconTicket fill={true} />,
        // component: <CreatePage />,
        roles: [Roles.ADMIN],
      },
    ],
    roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING],
  },
  // {
  //   url: "/setting",
  //   title: "Settings",
  //   isSidebarRendered: true,
  //   // component: <ListPage />,
  //   roles: [Roles.ADMIN],
  // },
];

export default DashboardRoutes;
