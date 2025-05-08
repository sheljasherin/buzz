import { INavigationRoutes } from "./types";
import {
  Home,
  LineChart,
  Package,
  Settings,
} from "lucide-react";

export const navigationRoutes: INavigationRoutes[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Home",
    path: "/home",
    protected: false,
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Myevents",
    path: "/userevents", // make sure your route exists
  },
  {
    icon: <Package className="h-5 w-5" />,
    label: "Create events",
    path: "/createevents", // 🔧 fixed: changed from "create" → "/create"
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    label: "AdminDashboard",
    path: "/Admindashboard",
    protected: true,
    allowedRoles: ["admin"],
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    label: "OrganizerDasboard",
    path: "/organizerevents", // 🔧 fixed: changed from "organizerevents" → "/organizerevents"
    protected: true,
    allowedRoles: ["organizer"],
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    label: "booked tickets",
    path: "/bookedtickets", // 🔧 fixed: changed from "/Admin" → "/admin" (consistent lowercase route)
    protected: true,
    // 💡 consider using "admin" here if it's for admin
  },
];

export const settingsRoute: INavigationRoutes = {
  icon: <Settings className="h-5 w-5" />,
  label: "Settings",
  path: "/settings",
};
