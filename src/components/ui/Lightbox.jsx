import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { lockScroll } from '../../motion/useSmoothScroll.js';
import './Lightbox.css';

/**
 * Full-size screenshot viewer on the native <dialog> element, which brings
 * focus trapping, Escape to close and the right screen-reader semantics.
 * Arrow keys (and the side buttons) move through `images`.
 */
export default function Lightbox({ images, index, onChange, onClose }) {
  const dialog = useRef(null);
  const open = index !== null;
  const image = open ? images[index] : null;

  useEffect(() => {
    const node = dialog.current;
    if (!node) return undefined;
    if (open && !node.open) {
      node.showModal();
      lockScroll(true);
    }
    if (!open && node.open) node.close();
    return undefined;
  }, [open]);

  // Make sure page scrolling comes back if the page unmounts while open.
  useEffect(() => () => lockScroll(false), []);

  const step = (delta) => onChange((index + delta + images.length) % images.length);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={image ? image.caption || image.alt : 'Screenshot'}
      onClose={() => {
        lockScroll(false);
        onClose();
      }}
      onKeyDown={onKeyDown}
      // A click on the dark backdrop (the dialog itself, not its content) closes it.
      onClick={(event) => event.target === dialog.current && dialog.current.close()}
      data-lenis-prevent
    >
      {image && (
        <figure className="lightbox__figure">
          <img
            className="lightbox__img"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          <figcaption className="lightbox__caption">
            <span>{image.caption || image.alt}</span>
            {images.length > 1 && (
              <span className="lightbox__count">
                {index + 1} / {images.length}
              </span>
            )}
          </figcaption>
        </figure>
      )}

      <button className="lightbox__btn lightbox__close" type="button" onClick={() => dialog.current.close()} aria-label="Close">
        <Icon name="close" />
      </button>
      {images.length > 1 && (
        <>
          <button className="lightbox__btn lightbox__prev" type="button" onClick={() => step(-1)} aria-label="Previous screenshot">
            <Icon name="arrow-right" />
          </button>
          <button className="lightbox__btn lightbox__next" type="button" onClick={() => step(1)} aria-label="Next screenshot">
            <Icon name="arrow-right" />
          </button>
        </>
      )}
    </dialog>
  );
}
