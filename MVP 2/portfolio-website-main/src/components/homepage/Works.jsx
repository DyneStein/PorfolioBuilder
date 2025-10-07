import Heading from "../ui/Heading";

export default function Works({ forwardedRef }) {
  return (
    <section
      ref={forwardedRef}
      id="works"
      className="nav-change my-[20%] overflow-hidden"
    >
      <Heading title="Projects" />
      <div className="mt-10 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12"></div>
      <div className="flex w-full items-center justify-center space-x-20">
        <h1 className="text-heading-1 font-medium leading-[1.25em] text-primary-200 md:leading-[1.08em]">
          updating soon...
        </h1>
      </div>
      <div className="flex w-full items-center justify-center space-x-20 py-10">
        <h1 className="font-outline-2 text-heading-1 font-medium leading-[1.25em] text-secondary-600 text-transparent md:leading-[1.08em]">
          updating soon...
        </h1>
      </div>
      <div className="flex w-full items-center justify-center space-x-20">
        <h1 className="text-heading-1 font-medium leading-[1.25em] text-primary-200 md:leading-[1.08em]">
          updating soon...
        </h1>
      </div>
    </section>
  );
}
