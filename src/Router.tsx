import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingZoneSwiper } from "./views/LandingZone/LandingZoneSwiper";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: (
            <LandingZoneSwiper />
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
