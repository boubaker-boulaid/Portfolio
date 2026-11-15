import Icon from './Icon.jsx';
import './ui.css';

/**
 * Lime call-to-action. Renders an <a> when `href` is given, otherwise a <button>.
 * `iconStyle="badge"` puts the arrow in a dark circle (used by "Let's Talk").
 */
export default function Button({
  href,
  icon = 'arrow-up-right',
  iconStyle = 'plain',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const Tag = href ? 'a' : 'button';
  const external = href?.startsWith('http');
  return (
    <Tag
      className={`btn btn--${size} ${className}`.trim()}
      href={href}
      type={href ? undefined : 'button'}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <span className={`btn__icon btn__icon--${iconStyle}`}>
          <Icon name={icon} />
        </span>
      )}
    </Tag>
  );
}
