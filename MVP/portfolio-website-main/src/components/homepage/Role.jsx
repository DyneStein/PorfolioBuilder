export default function Role({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="about"
      className="nav-change my-[20%] flex select-none flex-col items-center justify-center overflow-hidden py-10 md:my-[12%]"
      aria-label=""
    >
      <div className="flex w-full items-center space-x-20">
        <h1 className="text-heading-1 font-medium leading-[1.25em] text-primary-200 md:leading-[1.08em]">
          I am  a{" "}
          <span className="text-secondary-600">no-code portfolio website builder</span> that empowers anyone to create a{" "}
          <span className="text-secondary-600">stunning, professional online presence</span> in minutes — without any technical skills.
        </h1>
      </div>
    </section>
  );
}
