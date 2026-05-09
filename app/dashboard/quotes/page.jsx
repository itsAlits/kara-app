import { getContent } from "@/app/lib/data";
import QuotesEditor from "./QuotesEditor";

export default async function QuotesPage() {
  const content = await getContent();
  return <QuotesEditor initialData={content.quote} />;
}
