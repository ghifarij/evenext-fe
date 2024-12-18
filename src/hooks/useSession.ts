import { IUser } from "@/types/user";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const checkSession = async () => {
    try {
      const res = await fetch(`${base_url}/users/profile`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setUser(result.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { user, isAuth, setIsAuth, setUser };
};

export default useSession;
