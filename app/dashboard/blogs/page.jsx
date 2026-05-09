import { getContent } from "@/app/lib/data";
import BlogsEditor from "./BlogsEditor";

export default async function BlogsDashboardPage() {
  const content = await getContent();
  return <BlogsEditor initialData={content.blogs ?? []} />;
}
