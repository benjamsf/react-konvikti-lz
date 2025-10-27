import { useContext } from "react";
import { UserTypeContext } from "./userTypeFetcher";

export function useUserType() {
  return useContext(UserTypeContext);
}
