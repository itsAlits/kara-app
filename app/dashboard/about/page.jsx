import { getContent } from "@/app/lib/data";
import AboutEditor from "./AboutEditor";

export default async function AboutPage() {
  const content = await getContent();
  return <AboutEditor initialData={content.about} />;
}
