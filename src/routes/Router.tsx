import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense } from "react";
import { routeType } from "../types/routes.types";
import { routes } from "./routes";
import ProtectedGate from "./ProtectedGate";
import AuthorityGuard from "./AuthorityGuard";

/**
 * This configuration sets up the application's routing using `react-router-dom`.
 * It leverages the `createBrowserRouter` and `createRoutesFromElements` to dynamically
 * create routes based on a predefined configuration (`routes`).
 *
 * Each route is wrapped with lazy loading using `Suspense` and an optional `AuthorityGuard`
 * for route protection based on user roles or permissions.
 */
export const router = createBrowserRouter(
  createRoutesFromElements(
    // Mapping over the `routes` configuration to create route elements
    routes?.map((route: routeType) => {
      return (
        // Wrapping each route with a protection layer (if defined)
        <Route
          key={route.key + "protect"}
          path={route.path}
          element={<ProtectedGate protect={route.protect || false} />}
        >
          {/* Main route element with optional layout and lazy loading */}
          <Route
            key={route.key}
            path={route.path}
            element={
              <Suspense fallback={<route.loader />}>
                {/* Redirect if specified, else render the main route component */}
                {route.redirect && route.redirect}
                <route.component />
              </Suspense>
            }
          >
            {/* Nested routes for child components, if any */}
            {route.children?.map((child: routeType) => {
              return (
                // Each child route is wrapped with an `AuthorityGuard` for access control
                <Route
                  key={child.key + "auth"}
                  path={child.path}
                  element={<AuthorityGuard authority={child.authority || ""} />}
                >
                  {/* Child route element with lazy loading */}
                  <Route
                    key={child.key}
                    path={child.path}
                    element={
                      <Suspense fallback={<child.loader />}>
                        <child.component />
                      </Suspense>
                    }
                  />
                </Route>
              );
            })}
          </Route>
        </Route>
      );
    })
  )
);
