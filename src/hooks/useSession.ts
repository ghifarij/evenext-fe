import { useContext } from "react";

import { SessionContext as ISessionContext } from "@/types/event";
import { SessionContext } from "@/context/useSession";

export const useSession = (): ISessionContext => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};