import { protectServer } from "@/features/auth/util";
import { Banner } from "./banner";
import { ProjectsSection } from "./ProjectsSection";
import { TemplatesSection } from "./TemplatesSection";

export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
