import { getContent } from "@/app/lib/data";
import ClientsEditor from "./ClientsEditor";

export default async function ClientsPage() {
  const content = await getContent();
  return <ClientsEditor initialData={content.clients} />;
}
