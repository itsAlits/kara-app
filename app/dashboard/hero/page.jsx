import { getContent } from "@/app/lib/data";
import HeroEditor from "./HeroEditor";

export default async function HeroPage() {
  const content = await getContent();
  return <HeroEditor initialData={content.hero} />;
}
