import React from "react";
import WebVitalsMetrics from "src/components/common/WebVitalsMetrics";
import { Hero } from "./_components/hero";
import { About } from "./_components/about";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/projects";
import { Testimonials } from "./_components/testimonials";
import { Contact } from "./_components/contact";

export default function Home() {
  return (
    <React.Fragment>
      {/* <div
        className='py-2'
        style={{
          maxWidth: "68rem",
          marginLeft: "auto",
          marginRight: "auto",
          width: "91.666667%"
        }}>
        <WebVitalsMetrics />
      </div> */}
      <main className='container mx-auto !px-0 min-h-svh'>
        <div className='flex flex-col gap-20'>
          {/* hero */}
          <Hero />
          {/* about me */}
          <About />
          {/* my skills */}
          <Skills />
          {/* my projects */}
          <Projects />
          {/* my testimonials */}
          <Testimonials />
          {/* contact me */}
          <Contact />
        </div>
      </main>
    </React.Fragment>
  );
}
