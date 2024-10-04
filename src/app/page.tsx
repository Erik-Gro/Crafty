import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}

// import { auth } from "@/auth";
// import { Button } from "@/components/ui/button";
// import { protectServer } from "@/features/auth/util";
// import Image from "next/image";

// export default async function Home() {
//   protectServer();
//   return <div>you are logged in</div>;
// }
