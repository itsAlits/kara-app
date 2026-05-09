import { getContent } from "@/app/lib/data";
import TestimonialsEditor from "./TestimonialsEditor";

export default async function TestimonialsPage() {
  const content = await getContent();
  return <TestimonialsEditor initialData={content.testimonials} />;
}
