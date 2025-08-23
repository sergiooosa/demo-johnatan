import { SectionProps } from '../types';

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-tx1 mb-6">{title}</h2>
      {children}
    </section>
  );
} 