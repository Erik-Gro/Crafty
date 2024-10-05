import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { protectServer } from "@/features/auth/util";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  await protectServer();
  return <div>you are logged in</div>;
}
