import { getContent } from "@/app/lib/data";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./Section/Home/Landing/Landing";
import About from "./Section/Home/About/About";
import Clients from "./Section/Home/Clients/Client";
import Projects from "./Section/Home/Project/Project";
import Quotes from "./Section/Home/Quotes/Quotes";
import Testimonials from "./Section/Home/Testimonials/Testimonials";

export const dynamic = "force-dynamic"; // always fresh from content.json

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <Landing content={content.hero} />
      <Clients content={content.clients} />
      <Quotes content={content.quote} />
      <Projects content={content.projects} />
      <About content={content.about} />
      <Testimonials content={content.testimonials} />
      <Footer />
    </>
  );
}
