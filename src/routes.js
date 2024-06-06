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
import AddCustomers from "views/Customers/add";
import Customers from "views/Customers";
import EditCustomer from "views/Customers/edit";
import AddSales from "views/sales/add";
import Sales from "views/sales";
import AddPurchase from "views/purshaces/add";
import Purchases from "views/purshaces";
import Messenger from "views/Chat/Messenger";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <PersonIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    hide:false,
    permission:'view users'

  },
  {
    path: "/users",
    name: "Human Resource",
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
  //products
  {
    path: "/products",
    name: "Inventory",
    icon: <ProductIcon color="inherit" />,
    component: Products,
    layout: "/admin",
    hide:!hasPermission("view products"),
    permission:'view products',
    


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
  //customers
  {
    path: "/customers",
    name: "Customers",
    icon: <PersonIcon color="inherit" />,
    component: Customers,
    layout: "/admin",
    hide:!hasPermission("view customers"),
    permission:'view customers'
  },
  {
    path: "/add/customers",
    name: "CustomersAdd",
    icon: <PersonIcon color="inherit" />,
    component: AddCustomers,
    layout: "/admin",
    hide:true,
    permission:'publish customers'
  },
  {
    path: "/edit/customer/:id",
    name: "customersEdit",
    icon: <PersonIcon color="inherit" />,
    component: EditCustomer,
    layout: "/admin",
    hide:true,
    permission:'edit customers'

  },
  //sales
  {
    path: "/sales",
    name: "Sales",
    icon: <PersonIcon color="inherit" />,
    component: Sales,
    layout: "/admin",
    hide:false,
    permission:'edit customers'

  },
  {
    path: "/add/sales",
    name: "AddSales",
    icon: <PersonIcon color="inherit" />,
    component: AddSales,
    layout: "/admin",
    hide:true,
    permission:'edit customers'

  },
  //purchases
  {
    path: "/purchases",
    name: "Purshaces",
    icon: <PersonIcon color="inherit" />,
    component: Purchases,
    layout: "/admin",
    hide:false,
    permission:'edit customers'

  },
  {
    path: "/add/purchases",
    name: "AddPurshace",
    icon: <PersonIcon color="inherit" />,
    component: AddPurchase,
    layout: "/admin",
    hide:true,
    permission:'edit customers'

  },
  {
    path: "/chat",
    name: "Chat",
    icon: <ProductIcon color="inherit" />,
    component: Messenger,
    layout: "/admin",
  },
  

 
  
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   rtlName: "لوحة القيادة",
      //   icon: <PersonIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: Profile,
      //   layout: "/admin",
      // },
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
