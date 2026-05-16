import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './ImageSwiper.css';

const ImageSwiper = ({ images, cardWidth = 256, cardHeight = 352 }) => {
  const cardStackRef = useRef(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef(null);
  const didSwipe = useRef(false);
  const [lightbox, setLightbox] = useState(null);

  const imageList = Array.isArray(images)
    ? images
    : images.split(',').map(s => s.trim()).filter(Boolean);

  const [cardOrder, setCardOrder] = useState(() =>
    Array.from({ length: imageList.length }, (_, i) => i)
  );
  const cardOrderRef = useRef(cardOrder);
  useEffect(() => { cardOrderRef.current = cardOrder; }, [cardOrder]);

  const imageListRef = useRef(imageList);
  useEffect(() => { imageListRef.current = imageList; }, [imageList]);

  const getCards = useCallback(() => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll('.image-card')];
  }, []);

  const getActiveCard = useCallback(() => getCards()[0] || null, [getCards]);

  const updatePositions = useCallback(() => {
    getCards().forEach((card, i) => {
      card.style.setProperty('--i', (i + 1).toString());
      card.style.setProperty('--swipe-x', '0px');
      card.style.setProperty('--swipe-rotate', '0deg');
      card.style.opacity = '1';
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty('--swipe-x', `${deltaX}px`);
    card.style.setProperty('--swipe-rotate', `${deltaX * 0.2}deg`);
    card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75).toString();
  }, [getActiveCard]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 50;
    const duration = 300;
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        didSwipe.current = true;
        const direction = Math.sign(deltaX);
        card.style.setProperty('--swipe-x', `${direction * 300}px`);
        card.style.setProperty('--swipe-rotate', `${direction * 20}deg`);

        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty('--swipe-rotate', `${-direction * 20}deg`);
          }
        }, duration * 0.5);

        setTimeout(() => {
          setCardOrder(prev => prev.length === 0 ? [] : [...prev.slice(1), prev[0]]);
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getActiveCard, applySwipeStyles]);

  const handleStart = useCallback((clientX) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    didSwipe.current = false;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) card.style.transition = 'none';
  }, [getActiveCard]);

  const handleMove = useCallback((clientX) => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(() => {
      currentX.current = clientX;
      const deltaX = currentX.current - startX.current;
      applySwipeStyles(deltaX);
      if (Math.abs(deltaX) > 50) handleEnd();
    });
  }, [applySwipeStyles, handleEnd]);

  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;

    const onDown  = (e) => handleStart(e.clientX);
    const onMove  = (e) => handleMove(e.clientX);
    const onUp    = ()  => handleEnd();
    const onCancel = () => {
      // reset stuck state when browser interrupts the gesture
      isSwiping.current = false;
      didSwipe.current = false;
      startX.current = 0;
      currentX.current = 0;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };

    // 'click' is the most reliable cross-platform tap signal.
    // It fires after mouse-click and touch-tap, but NOT after a drag/swipe,
    // so we only need a lightweight guard for the pointer-event swipe path.
    const onClick = (e) => {
      if (didSwipe.current) {
        didSwipe.current = false;
        return;
      }
      const card = e.target.closest('.image-card');
      if (!card) return;
      const cards = [...el.querySelectorAll('.image-card')];
      if (cards.indexOf(card) !== 0) return; // only front card opens lightbox
      const originalIndex = cardOrderRef.current[0];
      setLightbox(imageListRef.current[originalIndex]);
    };

    el.addEventListener('pointerdown',  onDown);
    el.addEventListener('pointermove',  onMove);
    el.addEventListener('pointerup',    onUp);
    el.addEventListener('pointercancel', onCancel);
    el.addEventListener('click', onClick);

    return () => {
      el.removeEventListener('pointerdown',  onDown);
      el.removeEventListener('pointermove',  onMove);
      el.removeEventListener('pointerup',    onUp);
      el.removeEventListener('pointercancel', onCancel);
      el.removeEventListener('click', onClick);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <>
      <section
        className="image-swiper"
        ref={cardStackRef}
        style={{
          width: cardWidth + 32,
          height: cardHeight + 32,
          '--card-z-offset': '12px',
          '--card-y-offset': '7px',
          '--card-perspective': '700px',
        }}
      >
        {cardOrder.map((originalIndex, displayIndex) => (
          <article
            key={`${imageList[originalIndex]}-${originalIndex}`}
            className="image-card"
            style={{
              '--i': (displayIndex + 1).toString(),
              zIndex: imageList.length - displayIndex,
              width: cardWidth,
              height: cardHeight,
            }}
          >
            <img
              src={imageList[originalIndex]}
              alt={`Graduation ${originalIndex + 1}`}
              draggable={false}
            />
          </article>
        ))}
      </section>

      {lightbox && createPortal(
        <div className="swiper-lightbox" onClick={() => setLightbox(null)}>
          <img
            src={lightbox}
            alt="Full size"
            className="swiper-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="swiper-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
        </div>,
        document.body
      )}
    </>
  );
};

export default ImageSwiper;
