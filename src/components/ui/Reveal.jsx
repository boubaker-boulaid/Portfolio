/**
 * Marks a block that scrolls into view with motion. The animation itself is
 * set up by the owning section (see src/motion), so this is a plain wrapper
 * that keeps the markup stable and accepts any extra props (id, data-*).
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={className || undefined} {...rest}>
      {children}
    </Tag>
  );
}
