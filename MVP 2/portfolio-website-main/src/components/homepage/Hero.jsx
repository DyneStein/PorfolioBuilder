import { gsap } from "gsap";
import { useRef, useEffect } from "react";

export default function Hero() {
  const img = useRef(null);
  const imgContainer = useRef(null);
  const desktopTitles = useRef([]);
  const mobileTitles = useRef([]);
  const scrollLine = useRef(null);
  const scroll = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.from(scrollLine.current, {
      translateX: -40,
      duration: 1.5,
      ease: "power4.inOut",
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(imgContainer.current, {
      scale: 1.3,
      duration: 3.25,
      ease: "power3.inOut",
    })
      .from(
        img.current,
        { scale: 2, duration: 3.2, ease: "power4.inOut" },
        "-=3.1"
      )
      .to(
        [...desktopTitles.current, ...mobileTitles.current],
        {
          y: 0,
          duration: 2,
          ease: "power4.inOut",
        },
        "-=2.5"
      )
      .from(scroll.current, { opacity: 0, duration: 1, ease: "out" }, "-=2");
  }, []);

  return (
    <section
      id="hero"
      className="hero relative flex h-screen w-full select-none items-center justify-center"
      aria-label="hero"
    >
      {/* MOBILE VERSION */}
      <div className="z-10 flex w-full flex-col items-center text-title font-bold uppercase text-accent-300 sm:hidden -mt-10">
        <div className="title py-2">
          <h1
            ref={(el) => (mobileTitles.current[0] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[22.75vw] leading-none"
          >
            Hey, I&apos;m
          </h1>
          <h1
            ref={(el) => (mobileTitles.current[1] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[18vw] leading-none"
          >
            Portify
          </h1>
        </div>
        <div className="title py-2">
          <h1
            ref={(el) => (mobileTitles.current[2] = el)}
            className="font-outline-3 w-full translate-y-96 overflow-visible text-center text-transparent text-[22.75vw] leading-none"
          >
            Hey, I&apos;m
          </h1>
          <h1
            ref={(el) => (mobileTitles.current[3] = el)}
            className="font-outline-3 w-full translate-y-96 overflow-visible text-center text-transparent text-[18vw] leading-none"
          >
            Portify
          </h1>
        </div>
        <div className="title py-2">
          <h1
            ref={(el) => (mobileTitles.current[4] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[22.75vw] leading-none"
          >
            Hey, I&apos;m
          </h1>
          <h1
            ref={(el) => (mobileTitles.current[5] = el)}
            className="w-full translate-y-96 overflow-visible text-center text-[18vw] leading-none"
          >
            Portify
          </h1>
        </div>
      </div>
      {/* DESKTOP VERSION */}
      <div className="z-10 hidden w-full flex-col items-center text-title font-bold uppercase text-accent-300 sm:flex 2xl:space-y-16 2xl:text-[10vw]">
        <div className="title 2xl:py-16">
          <h1
            ref={(el) => (desktopTitles.current[0] = el)}
            className="w-full translate-y-96 overflow-visible text-[11.3vw]"
          >
            Hey, I&apos;m Portify
          </h1>
        </div>
        <div className="title 2xl:py-16">
          <h1
            ref={(el) => (desktopTitles.current[1] = el)}
            className="font-outline-3 md:font-outline-4 w-full translate-y-96 overflow-visible text-[11.3vw] text-transparent"
          >
            Hey, I&apos;m Portify
          </h1>
        </div>
        <div className="title 2xl:py-16">
          <h1
            ref={(el) => (desktopTitles.current[2] = el)}
            className="w-full translate-y-96 overflow-visible text-[11.3vw]"
          >
            Hey, I&apos;m Portify
          </h1>
        </div>
      </div>
      <div
        ref={imgContainer}
        className="absolute mx-auto w-[55%] overflow-hidden rounded-md"
      ></div>
    </section>
  );
}
