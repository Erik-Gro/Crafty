import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="size-8 relative shrink-0">
        <Image
          src="/svgs/logo.svg"
          fill
          alt="Crafty"
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};
