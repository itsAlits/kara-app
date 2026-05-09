import { getContent } from "@/app/lib/data";
import FooterEditor from "./FooterEditor";

export default async function FooterPage() {
  const content = await getContent();
  return <FooterEditor initialData={content.footer} />;
}
