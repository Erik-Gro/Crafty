import { auth } from "@/auth";
import { protectServer } from "@/features/auth/util";

export default async function Home() {
  await protectServer();
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
  // return <div>you are logged in</div>;
}
