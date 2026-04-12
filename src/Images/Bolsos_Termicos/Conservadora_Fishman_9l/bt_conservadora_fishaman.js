// src/data/accesorios-trampa2.js
const modules = import.meta.glob(
  './Conservadora_FISHMAN*.{jpg,jpeg,png,webp,avif}'
);

import moneyAR from '../../../utils/money.js';

export const CATEGORY = 'bolsos-termicos-bt-conservadora-fishman';

const files = Object.entries(modules)
  .map(([path, importFn]) => {
    const filename = path.split('/').pop();
    const num = Number(filename.match(/\d+/)?.[0] ?? 0);
    return { num, filename, importFn };
  })
  .filter((f) => f.num > 0)
  .sort((a, b) => a.num - b.num);

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function makeGroup(item) {
  const rep = item.num;
  const name = `Bolsos Térmicos Conservadora FISHMAN ${rep}`;
  const slug = slugify(`${rep}-${name}`);

  return {
    id: rep,
    uid: `${CATEGORY}-${rep}`,
    category: CATEGORY,
    slug,
    name,
    to: `/product/${CATEGORY}/${rep}/${slug}`,
    price: null,
    sizes: null,
    colors: null,
    primaryLoader: item.importFn,
    loaders: [item.importFn]
  };
}

const groups = files.map(makeGroup);

export const ACCESORIOS_GROUP = groups;

export const getGroupById = (id) =>
  ACCESORIOS_GROUP.find((g) => g.id === Number(id));

export async function loadPrimaryImage(group) {
  const m = await group.primaryLoader();
  return m.default;
}

export async function loadAllImages(group) {
  const arr = await Promise.all(
    group.loaders.map((fn) => fn().then((m) => m.default))
  );
  return arr;
}

export function groupToUiProduct(g) {
  return {
    id: g.id,
    slug: g.slug,
    title: g.name,
    price: g.price == null ? '' : moneyAR(g.price),
    priceRaw: g.price ?? null,
    imageLoader: () => loadPrimaryImage(g),
    galleryLoader: () => loadAllImages(g),
    variants: {
      colors: g.colors,
      sizes: g.sizes
    }
  };
}

export const ACCESORIOS_PRODUCTS = ACCESORIOS_GROUP.map(groupToUiProduct);
