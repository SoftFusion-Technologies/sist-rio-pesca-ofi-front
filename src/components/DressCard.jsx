import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { moneyAR } from '../utils/money';

export default function DressCard({ item, compact = false }) {
  const { name, price, imageLoader, to } = item;
  const [src, setSrc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    let mounted = true;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && mounted) {
          try {
            const url = await imageLoader();
            if (mounted) setSrc(url);
          } catch {}
          io.disconnect();
        }
      },
      { root: null, rootMargin: '120px 0px', threshold: 0.01 }
    );

    io.observe(el);
    return () => {
      mounted = false;
      io.disconnect();
    };
  }, [imageLoader]);

  const hasPrice = price !== null && price !== undefined && price !== '';

  return (
    <Link to={to} aria-label={name} className="block h-full">
      <motion.article
        ref={ref}
        className={[
          'group relative h-full overflow-hidden rounded-xl border border-white/10 bg-black/35 backdrop-blur-[2px] transition-all duration-300',
          compact ? 'shadow-none' : 'shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
        ].join(' ')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className={[
            'relative w-full overflow-hidden bg-white/95',
            compact ? 'aspect-square p-2' : 'aspect-[4/5] p-3'
          ].join(' ')}
        >
          {src ? (
            <img
              src={src}
              alt={name}
              className={[
                'absolute inset-0 h-full w-full select-none transition-transform duration-300',
                compact
                  ? 'object-contain p-2 group-hover:scale-[1.02]'
                  : 'object-contain p-3 group-hover:scale-[1.03]'
              ].join(' ')}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-white/70" />
          )}
        </div>

        <div className={compact ? 'p-2.5' : 'p-3'}>
          <h3
            className={[
              'line-clamp-2 uppercase text-white',
              compact
                ? 'text-[11px] sm:text-xs font-medium leading-tight'
                : 'text-sm font-medium leading-snug'
            ].join(' ')}
          >
            {name}
          </h3>

          {hasPrice && (
            <p
              className={[
                'text-white/75',
                compact ? 'mt-1 text-[11px] sm:text-xs' : 'mt-1 text-sm'
              ].join(' ')}
            >
              {moneyAR(price)}
            </p>
          )}
          Ver
        </div>
      </motion.article>
    </Link>
  );
}
