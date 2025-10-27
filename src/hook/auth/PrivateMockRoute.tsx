import { ReactNode } from "react";

export const PrivateRoute = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <>{children}</>;
};
