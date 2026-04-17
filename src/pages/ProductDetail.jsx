import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronRight,
  Maximize2,
  X,
  MessageCircle,
  Fish
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import ProductNotFound from '../components/ProductNotFound';

// ACCESORIOS 
import {
  getGroupById as getAccesorioAnzuelo,
  loadAllImages as loadAllImagesAnzuelos
} from '../Images/Accesorios/Anzuelos/accesorios-anzuelos';

import {
  getGroupById as getCableAceroTuboAluminio,
  loadAllImages as loadAllImagesCableAceroTuboAluminio
} from '../Images/Accesorios/CableDeAceroConTubodeAluminio/accesorios-cablesAcero';

import {
  getGroupById as getCascabelPluz,
  loadAllImages as loadAllImagesCascabelPluz
} from '../Images/Accesorios/CascabelPluz/accesorios-cascabelPluz';

import {
  getGroupById as getEsmerillones,
  loadAllImages as loadAllImagesEsmerillones
} from '../Images/Accesorios/Esmerillones/accesorios-esmerillones';

import {
  getGroupById as getTrampa2,
  loadAllImages as loadAllImagesTrampa2
} from '../Images/Accesorios/TrampaMojarrera2/accesorios-trampa2';

import {
  getGroupById as getTrampa6,
  loadAllImages as loadAllImagesTrampa6
} from '../Images/Accesorios/TrampaMojarrera6/accesorios-trampa6';
// ACCESORIOS 

// BOLSOS TERMICOS 
import {
  getGroupById as getBolsosTermicosbt_75,
  loadAllImages as loadAllImagesBolsosTermicosbt_75
} from '../Images/Bolsos_Termicos/bt_7,5l/bt_7,5l';

import {
  getGroupById as getBolsosTermicosbt_135,
  loadAllImages as loadAllImagesBolsosTermicosbt_135
} from '../Images/Bolsos_Termicos/bt_13,5l/bt_13,5';

import {
  getGroupById as getBolsosTermicosbt_ConservadoraFishman,
  loadAllImages as loadAllImagesBolsosTermicosbt_ConservadoraFishman
} from '../Images/Bolsos_Termicos/Conservadora_Fishman_9l/bt_conservadora_fishaman';

import {
  getGroupById as getBolsosTermicosbt_ConservadoraTelgopor,
  loadAllImages as loadAllImagesBolsosTermicosbt_ConservadoraTelgopor
} from '../Images/Bolsos_Termicos/Conservadora_Telgopor/bt_conservadora_telgopor';  

// BOLSOS TERMICOS 

// BOYAS
import {
  getGroupById as getBoyas,
  loadAllImages as loadAllImagesBoyas
} from '../Images/Boyas/boyas';
// BOYAS

// Camping
import {
  getGroupById as getCamping,
  loadAllImages as loadAllImagesCamping
} from '../Images/Camping/camping';
// Camping

// Cañas
import {
  getGroupById as getCañas,
  loadAllImages as loadAllImagesCañas
} from '../Images/Cañas/Cañas';
// Cañas

// Combos
import {
  getGroupById as getCombos,
  loadAllImages as loadAllImagesCombos
} from '../Images/Combos/combos';
// Combos

// Cuellos
import {
  getGroupById as getCuellos,
  loadAllImages as loadAllImagesCuellos
} from '../Images/Cuello/Cuello';
// Cuellos

// Gaveteros y Cajas
import {
  getGroupById as getGaveteros_Cajas,
  loadAllImages as loadAllImagesGaveteros_Cajas
} from '../Images/Gaveteros_Cajas/Gaveteros_Cajas';
// Gaveteros y Cajas
/*
 * Benjamin Orellana - 2026-03-21 - Detalle de producto unificado para catálogos locales.
 * Se adapta estilo ecommerce premium a la identidad visual de Río de Pesca, manteniendo CTA principal a WhatsApp.
 */

function buildWhatsAppUrl(productName) {
  const base =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const defaultMsg =
    siteConfig?.contact?.whatsappMessage ||
    'Hola, quisiera consultar por un producto.';

  const msg = `${defaultMsg} Me interesa: ${productName}.`;
  const sep = base.includes('?') ? '&' : '?';

  return `${base}${sep}text=${encodeURIComponent(msg)}`;
}

export default function ProductDetail() {
  const { catalog, id } = useParams();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [catalog, id]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const sources = {
        'accesorios-anzuelos': {
          get: getAccesorioAnzuelo,
          load: loadAllImagesAnzuelos,
          label: 'Accesorios · Anzuelos'
        },
        'accesorios-cables-acero-tubos-aluminio': {
          get: getCableAceroTuboAluminio,
          load: loadAllImagesCableAceroTuboAluminio,
          label: 'Accesorios · Cable de Acero con Tubos de Aluminio'
        },
        'accesorios-cascabelPluz': {
          get: getCascabelPluz,
          load: loadAllImagesCascabelPluz,
          label: 'Accesorios · Cascabel Pluz'
        },
        'accesorios-esmerillones': {
          get: getEsmerillones,
          load: loadAllImagesEsmerillones,
          label: 'Accesorios · Esmerillones'
        },
        'accesorios-trampa': {
          get: getTrampa2,
          load: loadAllImagesTrampa2,
          label: 'Accesorios · Trampa Mojarrera 2 Bocas'
        },
        'accesorios-trampa6': {
          get: getTrampa6,
          load: loadAllImagesTrampa6,
          label: 'Accesorios · Trampa Mojarrera 6 Bocas'
        },
        'bolsos-termicos-bt-75': {
          get: getBolsosTermicosbt_75,
          load: loadAllImagesBolsosTermicosbt_75,
          label: 'Bolsos Térmicos · 7,5 Litros'
        },
        'bolsos-termicos-bt-135': {
          get: getBolsosTermicosbt_135,
          load: loadAllImagesBolsosTermicosbt_135,
          label: 'Bolsos Térmicos · 13,5 Litros'
        },
        'bolsos-termicos-bt-conservadora-fishman': {
          get: getBolsosTermicosbt_ConservadoraFishman,
          load: loadAllImagesBolsosTermicosbt_ConservadoraFishman,
          label: 'Bolsos Térmicos · Conservadora FISHMAN'
        },
        'bolsos-termicos-bt-conservadora-telgopor': {
          get: getBolsosTermicosbt_ConservadoraTelgopor,
          load: loadAllImagesBolsosTermicosbt_ConservadoraTelgopor,
          label: 'Bolsos Térmicos · Conservadora TELGOPOR'
        },
        'boyas': {
          get: getBoyas,
          load: loadAllImagesBoyas,
          label: 'Boyas'
        },
        'camping': {
          get: getCamping,
          load: loadAllImagesCamping,
          label: 'Camping'
        },
        'cañas': {
          get: getCañas,
          load: loadAllImagesCañas,
          label: 'Cañas'
        },
        'combos': {
          get: getCombos,
          load: loadAllImagesCombos,
          label: 'Combos'
        },
        'cuellos': {
          get: getCuellos,
          load: loadAllImagesCuellos,
          label: 'Cuellos'
        },
        'gaveteros-cajas': {
          get: getGaveteros_Cajas,
          load: loadAllImagesGaveteros_Cajas,
          label: 'Gaveteros y Cajas'
        }
      };

      const src = sources[catalog];
      if (!src) {
        if (!cancelled) {
          setProduct(null);
          setImages([]);
        }
        return;
      }

      const found = src.get?.(Number(id)) || null;

      if (!found) {
        if (!cancelled) {
          setProduct(null);
          setImages([]);
        }
        return;
      }

      const gallery = await src.load(found);

      if (cancelled) return;

      setProduct({
        ...found,
        categoryLabel: src.label
      });
      setImages(Array.isArray(gallery) ? gallery : []);
      setCurrentIndex(0);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [catalog, id]);

  const onKeyDown = useCallback(
    (e) => {
      if (!images.length) return;

      if (e.key === 'ArrowRight') {
        setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Escape') {
        setLightbox(false);
      }
    },
    [images.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const mainImage = useMemo(() => {
    return images[currentIndex] || images[0] || null;
  }, [images, currentIndex]);

  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-[#07111f] text-white">
        <div className="max-w-5xl w-full p-6">
          <ProductNotFound />
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#07111f] text-white">
      <div className="h-[3px] bg-gradient-to-r from-[#54a4ce] via-[#79c4ea] to-[#54a4ce]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
            <li>
              <Link
                to="/"
                className="hover:text-[#79c4ea] inline-flex items-center gap-1"
              >
                Inicio <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            </li>

            <li>
              <Link
                to="/#productos"
                className="hover:text-[#79c4ea] inline-flex items-center gap-1"
              >
                Productos <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            </li>

            <li className="font-medium text-white">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Galería */}
          <div>
            <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0b1b2d] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
              <AnimatePresence mode="wait">
                {mainImage ? (
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ aspectRatio: '4 / 5' }}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.2, scale: 1.02 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    draggable={false}
                  />
                ) : (
                  <div
                    key="fallback"
                    className="absolute inset-0"
                    style={{
                      aspectRatio: '4 / 5',
                      background:
                        'radial-gradient(320px 140px at 80% 10%, rgba(121,196,234,0.18), transparent 60%), linear-gradient(180deg, #0c2238 0%, #091a2e 100%)'
                    }}
                  />
                )}
              </AnimatePresence>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,12,20,0.05) 0%, rgba(5,12,20,0.16) 45%, rgba(5,12,20,0.34) 100%)'
                }}
              />

              {mainImage && (
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/45 backdrop-blur px-3 py-2 text-sm hover:bg-black/60"
                  aria-label="Ver imagen a pantalla completa"
                >
                  <Maximize2 className="w-4 h-4 text-white/90" />
                  <span className="text-white/90">Ampliar</span>
                </button>
              )}

              <div className="invisible" style={{ aspectRatio: '4 / 5' }} />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {(images.length ? images : [null]).slice(0, 8).map((url, idx) => {
                const active = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => url && setCurrentIndex(idx)}
                    className={[
                      'relative aspect-square rounded-2xl overflow-hidden transition border',
                      active
                        ? 'border-[#79c4ea] shadow-[0_0_0_1px_rgba(121,196,234,.25)]'
                        : 'border-white/10',
                      url ? 'cursor-pointer' : 'opacity-80'
                    ].join(' ')}
                    aria-label={url ? `Ver imagen ${idx + 1}` : 'Imagen'}
                  >
                    {url ? (
                      <img
                        src={url}
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0b1b2d]" />
                    )}
                  </button>
                );
              })}
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <li className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3">
                <Truck className="w-5 h-5 text-[#79c4ea]" />
                <span>Consultá envíos</span>
              </li>
              <li className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3">
                <RefreshCw className="w-5 h-5 text-[#79c4ea]" />
                <span>Cambios sujetos a políticas</span>
              </li>
              <li className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3">
                <ShieldCheck className="w-5 h-5 text-[#79c4ea]" />
                <span>Atención personalizada</span>
              </li>
            </ul>
          </div>

          {/* Panel derecho */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d2035] to-[#0a1829] p-5 md:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#79c4ea]/25 bg-[#79c4ea]/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#c7ecff]">
                    <Fish className="w-3.5 h-3.5" />
                    {product.categoryLabel || 'Producto'}
                  </div>

                  <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">
                    {product.name}
                  </h1>

                  <p className="text-white/68 mt-2 text-sm leading-6">
                    {product.shortDesc}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[26px] leading-none font-semibold text-[#a7dff7]">
                    {product.priceLabel || 'Consultar precio'}
                  </div>
                </div>
              </div>

              {(product.tags || []).length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] text-white/88 border border-white/10 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.98), rgba(37,211,102,0.98))',
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow:
                      '0 14px 28px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.14)'
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar por WhatsApp
                </a>

                <Link
                  to="/#productos"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white/92 font-semibold border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                >
                  Volver a productos
                </Link>
              </div>

              <p className="text-[11px] text-white/56 mt-3">
                La disponibilidad, variantes y precio final pueden confirmarse
                al momento de la consulta.
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <details open className="p-5 md:p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <h3 className="text-base font-medium">Descripción</h3>
                </summary>

                <div className="mt-3 text-sm leading-relaxed text-white/85 space-y-3">
                  {(product.description || '')
                    .split('\n')
                    .map((line, i) =>
                      line.trim() ? <p key={i}>{line.trim()}</p> : null
                    )}
                </div>
              </details>

              <div className="h-px bg-white/10 mx-5" />

              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-black/20 border border-white/8 p-4">
                  <p className="font-medium mb-1">Ideal para</p>
                  <p className="text-white/80">
                    Salidas recreativas, organización de equipo y consulta
                    personalizada según necesidad.
                  </p>
                </div>

                <div className="rounded-2xl bg-black/20 border border-white/8 p-4">
                  <p className="font-medium mb-1">Asesoramiento</p>
                  <p className="text-white/80">
                    Podemos orientarte según uso, presupuesto y tipo de salida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA mobile */}
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 p-3 pointer-events-none">
          <div className="pointer-events-auto mx-auto max-w-6xl">
            <div className="rounded-2xl border border-white/10 bg-[#091522]/85 backdrop-blur p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/70 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-base font-semibold text-[#a7dff7]">
                    {product.priceLabel || 'Consultar precio'}
                  </p>
                </div>

                <a
                  href={buildWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.98), rgba(37,211,102,0.98))'
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-[#54a4ce] via-[#79c4ea] to-[#54a4ce]" />

      <AnimatePresence>
        {lightbox && mainImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="h-full w-full grid place-items-center p-4">
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-[90vh] max-w-[95vw] object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
