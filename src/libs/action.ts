"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteCookie = (key: string) => {
  cookies().delete(key);
};

export const getToken = () => {
  return cookies().get("token");
};

export const revalidate = (tags: string) => {
  revalidateTag(tags);
<<<<<<< HEAD
};
=======
};
>>>>>>> 5b5712d72f59f276cd759e09e45227282d21d903
