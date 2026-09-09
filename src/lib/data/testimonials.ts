/**
 * The old site has no testimonials section at all. These are clearly
 * marked placeholder entries only — schema is real, quotes and names
 * are not. Do not present these as real student testimonials; replace
 * with actual submissions before launch.
 */

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  discipline: "Escrima" | "Arnis" | "Kali" | "Mestizo Method";
  placeholder: true;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote: "[Placeholder testimonial — replace with a real student quote.]",
    attribution: "[Placeholder name, program]",
    discipline: "Escrima",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    quote: "[Placeholder testimonial — replace with a real student quote.]",
    attribution: "[Placeholder name, program]",
    discipline: "Kali",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    quote: "[Placeholder testimonial — replace with a real affiliate school quote.]",
    attribution: "[Placeholder affiliate school name]",
    discipline: "Mestizo Method",
    placeholder: true,
  },
];
