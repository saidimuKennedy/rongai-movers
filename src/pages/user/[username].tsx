import { useRouter } from "next/router";

export default function Userpage() {
  const router = useRouter();
  const { username } = router.query;

  return <h1>Welcome to {username}'s page</h1>;
}
