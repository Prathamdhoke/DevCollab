import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarDays,
  MessageSquareMore,
  UserCircle,
} from "lucide-react";

const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    id: 2,
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },

//   {
//     id: 3,
//     title: "Teams",
//     icon: Users,
//     path: "/teams",
//   },

  {
    id: 4,
    title: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },

  {
    id: 5,
    title: "Messages",
    icon: MessageSquareMore,
    path: "/messages",
  },

  {
    id: 6,
    title: "Profile",
    icon: UserCircle,
    path: "/profile",
  },
];

export default sidebarData;
