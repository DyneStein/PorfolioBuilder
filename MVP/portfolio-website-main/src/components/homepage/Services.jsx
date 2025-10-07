import ServiceUi from "../ui/ServiceUi";
import Heading from "../ui/Heading";

export default function Services() {
  const expertiseItems = [
    "Guided Website Builder",
    "AI-Assisted Design",
    "Responsive Templates",
    "Real-time Preview",
    "One-Click Deployment",
  ];

  const toolBoxItems = [
    "Theme Customization",
    "Content Management",
    "Mobile Optimization",
    "SEO Optimization",
    "Export & Download",
  ];

  return (
    <section id="services" className="my-[15%]" aria-label="services">
      <Heading title="services" />
      <div className="space-y-14">
        <ServiceUi
          title="our core services."
          description="Our services are designed to make building your personal portfolio website effortless, intuitive, and truly yours. We offer a guided, step-by-step website builder that lets anyone — regardless of technical background — create a professional online presence in minutes. From selecting a theme and color palette to customizing sections like About Me, Skills, Projects, and Contact, our system makes every step simple and visually interactive."
          items={expertiseItems}
        />
        <ServiceUi
          title="what you get."
          description="You can personalize layouts, upload your photos, write your story, and instantly preview how your website will look across all devices. We also provide AI-assisted suggestions for bios, skills, and design styles to help you present yourself in the best possible way. Every portfolio created through our platform is fully responsive, modern, and exportable — meaning you can download your website code or deploy it instantly. Whether you're a student, freelancer, or entrepreneur, our services ensure you have a beautiful, functional, and professional digital identity that truly represents who you are."
          items={toolBoxItems}
        />
      </div>
    </section>
  );
}
