import { useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "../../hooks/useFetch";

export default function LogoutPage() {
  const router = useRouter();
  const { doFetch } = useFetch({
    url: "/api/users/logout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    doFetch();
  }, []);

  return <div>Logging out...</div>;
}
