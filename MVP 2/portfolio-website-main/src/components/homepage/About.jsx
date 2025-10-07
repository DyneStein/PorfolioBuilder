import { useEffect, useRef } from "react";
import profileImg from "/Portify.webp";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function About() {
  const profile = useRef(null);
  const aboutSection = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: aboutSection.current,
      start: "top 400px",
      animation: gsap
        .timeline()
        .to(
          heading.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0
        )
        .to(
          body.current,
          { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
          0.2
        ),

      toggleActions: "play none none none",
    });
    ScrollTrigger.refresh();
  }, [aboutSection]);

  return (
    <section ref={aboutSection} aria-label="about me" className="py-10">
      <Heading title="about me" />
      <div className="mt-10 flex flex-col items-start gap-8 md:flex-row lg:gap-10 ">
        <div className="top-28 overflow-hidden rounded-md md:sticky md:w-1/2">
          <img
            ref={profile}
            loading="lazy"
            className="aspect-square h-auto w-full rounded-md object-cover object-center md:aspect-auto"
            src={profileImg}
            width="600"
            height="800"
            alt="portrait image of zeeshan standing"
          />
        </div>
        <div className="top-20 sm:sticky md:top-28 md:w-1/2 lg:top-32">
          <div className="w-full space-y-4 2xl:space-y-10">
            <h3
              ref={heading}
              className="translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:text-7xl"
            >
              Who am I?
            </h3>
            <p
              ref={body}
              className=" translate-y-10 text-body-1 opacity-0 2xl:text-4xl"
            >
              We believe that creating a professional online presence shouldn&apos;t require coding skills, design expertise, or hours of frustration. Our platform was built on a simple idea — to make portfolio creation as effortless as making a presentation on Gamma or Canva. Whether you&apos;re a student, freelancer, artist, or entrepreneur, your story deserves to be told beautifully.
              <br />
              <br />
              With our guided step-by-step builder, anyone — even without technical knowledge — can design, customize, and launch a stunning portfolio website in minutes. Our system simplifies the process into intuitive stages: choose your theme, personalize your sections, upload your content, and preview your site in real time.
              <br />
              <br />
              It&apos;s not just another website builder; it&apos;s a personalized digital identity generator, tailored to your profession and style. Inspired by tools like Gamma and Notion, we&apos;ve reimagined them for a new purpose — helping every individual craft a professional presence that speaks for them effortlessly, elegantly, and intelligently.
              <br />
              <br />
              Our vision is to democratize digital identity creation, making professional portfolio websites accessible to everyone, regardless of their technical background. We&apos;re on a mission to empower individuals to showcase their work, passion, and personality through beautifully designed, AI-assisted, and fully customizable portfolio websites. Guided by simplicity, creativity, accessibility, innovation, and empowerment, we&apos;re redefining how people build their digital presence. Because your story deserves more than a résumé — it deserves a website that feels like you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
