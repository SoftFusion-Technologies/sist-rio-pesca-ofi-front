import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
  ShieldCheck
} from 'lucide-react';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data/faqData';
import { siteConfig } from '../config/siteConfig';

/*
 * Benjamin Orellana - 2026-03-21 - Creación del page /faq con búsqueda, categorías y acordeón expansible.
 * La estructura queda preparada para crecimiento futuro del contenido sin modificar la composición visual.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id || null);

  const whatsappUrl =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();

    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.some((block) => {
          if (block.type === 'paragraph') {
            return block.text.toLowerCase().includes(q);
          }

          if (block.type === 'list') {
            return block.items.some((li) => li.toLowerCase().includes(q));
          }

          return false;
        });

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section className="min-h-screen bg-[#f5f8fc] text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Hero */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative overflow-hidden rounded-[32px] border border-[#d9e6f5] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(560px 180px at 10% 0%, rgba(37,99,235,0.10), transparent 60%),
                radial-gradient(380px 180px at 100% 0%, rgba(14,165,233,0.10), transparent 55%)
              `
            }}
          />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Centro de ayuda
              </div>

              <h1 className="mt-4 font-bignoodle uppercase   text-4xl font-bold tracking-tight text-[#1778e6] sm:text-5xl">
                Preguntas Frecuentes
              </h1>

              <div className="mt-3 h-1 w-28 rounded-full bg-[#1778e6]" />

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                Encontrá respuestas rápidas sobre compras, cambios, devoluciones.
              </p>
            </div>

            <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-[#1778e6] to-[#0e5ec4] p-5 text-white shadow-[0_18px_45px_rgba(23,120,230,0.28)] sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <HelpCircle className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
                    Ayuda rápida
                  </p>
                  <h2 className="mt-1 text-xl font-bold leading-tight">
                    ¿No encontraste lo que buscabas?
                  </h2>
                  {whatsappUrl && whatsappUrl !== 'https://wa.me/' ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-[#1778e6] transition hover:scale-[1.02]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contactar soporte
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 rounded-[28px] border border-[#d9e6f5] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por palabra clave..."
                className="w-full rounded-2xl border border-slate-200 bg-[#f8fbff] py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#1778e6] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => {
                const active = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={[
                      'rounded-full px-4 py-2 text-sm font-semibold transition',
                      active
                        ? 'bg-[#1778e6] text-white shadow-[0_10px_25px_rgba(23,120,230,0.22)]'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#1778e6]'
                    ].join(' ')}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.length ? (
            filteredFaqs.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  custom={index + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="overflow-hidden rounded-[26px] border border-[#dbe7f4] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {getCategoryLabel(item.category)}
                      </p>
                      <h3
                        className={[
                          'text-lg font-semibold leading-snug transition sm:text-[1.7rem]',
                          isOpen ? 'text-[#1778e6]' : 'text-slate-900'
                        ].join(' ')}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <span
                      className={[
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition',
                        isOpen
                          ? 'bg-blue-50 text-[#1778e6]'
                          : 'bg-slate-50 text-slate-500'
                      ].join(' ')}
                    >
                      <ChevronDown
                        className={[
                          'h-5 w-5 transition-transform duration-300',
                          isOpen ? 'rotate-180' : ''
                        ].join(' ')}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#e8f0f9] bg-[#fbfdff] px-5 py-5 sm:px-6 sm:py-6">
                          <FaqAnswer blocks={item.answer} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                No encontramos resultados
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Probá con otra palabra clave o cambiá la categoría seleccionada.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function FaqAnswer({ blocks }) {
  return (
    <div className="space-y-4 text-slate-600">
      {blocks.map((block, idx) => {
        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="text-base leading-8 text-slate-600">
              {block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={idx} className="space-y-3 pl-5">
              {block.items.map((item, liIdx) => (
                <li
                  key={liIdx}
                  className="list-disc text-base leading-8 text-slate-600 marker:text-[#1778e6]"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}

function getCategoryLabel(categoryId) {
  const found = FAQ_CATEGORIES.find((c) => c.id === categoryId);
  return found?.label || 'General';
}
