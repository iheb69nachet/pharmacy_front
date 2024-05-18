// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import SignOut from "views/Pages/SignOut.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import Users from "views/Users";
import AddUsers from "views/Users/add";
import EditUser from "views/Users/edit";
import Products from "views/Products";
import AddProducts from "views/Products/add";
import { ProductIcon } from "components/Icons/Icons";
import Chat from "views/Chat";
import EditProduct from "views/Products/edit";
import { hasPermission } from "helpers/permission";

var dashRoutes = [
  {
    path: "/users",
    name: "Users",
    icon: <PersonIcon color="inherit" />,
    component: Users,
    layout: "/admin",
    hide:!hasPermission("view users"),
    permission:'view users'

  },
  {
    path: "/add/users",
    name: "UsersAdd",
    icon: <PersonIcon color="inherit" />,
    component: AddUsers,
    layout: "/admin",
    hide:true,
    permission:'publish users'
  },
  {
    path: "/edit/user/:id",
    name: "userEdit",
    icon: <PersonIcon color="inherit" />,
    component: EditUser,
    layout: "/admin",
    hide:true,
    permission:'edit users'

  },
  {
    path: "/products",
    name: "Products",
    icon: <ProductIcon color="inherit" />,
    component: Products,
    layout: "/admin",
    hide:!hasPermission("view products"),
    permission:'view products',
    


  },
  {
    path: "/chat",
    name: "Chat",
    icon: <ProductIcon color="inherit" />,
    component: Chat,
    layout: "/admin",
  },
  {
    path: "/add/products",
    name: "ProductsAdd",
    icon: <PersonIcon color="inherit" />,
    component: AddProducts,
    layout: "/admin",
    hide:true,
    permission:'publish products'

  },
  {
    path: "/edit/product/:id",
    name: "productsEdit",
    icon: <PersonIcon color="inherit" />,
    component: EditProduct,
    layout: "/admin",
    hide:true,
    permission:'edit products'

  },
 

 
  
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
        hide: true
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
    hide:true

      },
      {
        path: "/signout",
        name: "Logout",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: SignOut,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
