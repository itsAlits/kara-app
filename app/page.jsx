import Navbar from "./Components/Navbar";
import Landing from "./Section/Home/Landing/Landing";
import About from "./Section/Home/About/About";
import Clients from "./Section/Home/Clients/Client";
import Projects from "./Section/Home/Project/Project";
import Quotes from "./Section/Home/Quotes/Quotes";
import Testimonials from "./Section/Home/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <Clients />
      <Quotes />
      <Projects />
      <About />
      <Testimonials />
    </>
  );
}
