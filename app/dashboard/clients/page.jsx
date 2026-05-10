import { getContent } from "@/app/lib/data";
import ClientsEditor from "./ClientsEditor";

const DEFAULT_CLIENTS = {
  label: "Trusted by growing brands — and counting",
  logos: [],
};

export default async function ClientsPage() {
  const content = await getContent();
  return <ClientsEditor initialData={content.clients ?? DEFAULT_CLIENTS} />;
}
