'use client';

const techs = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Tailwind CSS',
  'React Native', 'Spring Boot', 'GraphQL', 'Kubernetes',
];

export default function LogoMarquee() {
  return (
    <section className="logo-marquee" aria-label="Tecnologias utilizadas">
      <div className="logo-marquee__track">
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="logo-marquee__item">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
