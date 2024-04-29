import { lazy } from "react";
import { routeType } from "../types/routes.types";
import ComponentLoader from "../components/ui/loaders/ComponentLoader";
import MainLayout from "../layouts/MainLayout";
import LayoutLoader from "../components/ui/loaders/LayoutLoader";
import AuthLayout from "@/layouts/AuthLayout";

const HomePage = lazy(() => import("../views/home/HomePage"));
const ProfilePage = lazy(() => import("../views/profile/ProfilePage"));
const RecipePage = lazy(() => import("../views/recipe/RecipePage"));
const CreateRecipe = lazy(() => import("../views/recipe/CreateRecipe"));

const Signin = lazy(() => import("../views/auth/Signin"));
const Signup = lazy(() => import("../views/auth/Signup"));

export const routes: routeType[] = [
  {
    path: "/",
    key: "mainLayout",
    component: MainLayout,
    protect: true,
    loader: LayoutLoader,
    children: [
      {
        path: "/",
        key: "home",
        component: HomePage,
        loader: ComponentLoader,
        authority: "USER",
      },
      {
        path: "/profile",
        key: "profile",
        component: ProfilePage,
        loader: ComponentLoader,
        authority: "USER",
      },
      {
        path: "/recipe/:id",
        key: "recipe",
        component: RecipePage,
        loader: ComponentLoader,
        authority: "USER",
      },
      {
        path: "/create-recipe",
        key: "create-recipe",
        component: CreateRecipe,
        loader: ComponentLoader,
        authority: "USER",
      },
    ],
  },
  {
    path: "/auth",
    key: "authLayout",
    component: AuthLayout,
    protect: false,
    loader: LayoutLoader,
    children: [
      {
        path: "/auth/sign-in",
        key: "signin",
        component: Signin,
        loader: ComponentLoader,
        authority: "PUBLIC",
      },
      {
        path: "/auth/sign-up",
        key: "signup",
        component: Signup,
        loader: ComponentLoader,
        authority: "PUBLIC",
      },
    ],
  },
];
