import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingZoneSwiper } from "./views/LandingZone/LandingZoneSwiper";
import { LoginView } from "./views/LoginView";
import { PrivateRoute } from "./hook/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <LandingZoneSwiper />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginView />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
