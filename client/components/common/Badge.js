export default function Badge({ children, variant = 'solid' }) {
  const base =
    variant === 'outline'
      ? 'border border-sky-200 text-sky-600 bg-sky-50'
      : 'bg-primary/90 text-white';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${base}`}>{children}</span>
  );
}


