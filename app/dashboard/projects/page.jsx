import { getContent } from "@/app/lib/data";
import ProjectsEditor from "./ProjectsEditor";

export default async function ProjectsPage() {
  const content = await getContent();
  return <ProjectsEditor initialData={content.projects} />;
}
