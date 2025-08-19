export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = variant === 'dark' ? 'btn-dark' : 'btn';
  return (
    <button className={`${base} ${className}`} {...props}>{children}</button>
  );
}


