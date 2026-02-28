// src/config/siteConfig.js
// Benjamin Orellana - 2026-02-22 - Configuración reusable del sitio Río de Pesca

export const siteConfig = {
  brand: {
    name: 'Río de Pesca',
    tagline: 'Artículos de pesca y camping',
    locationLabel: 'Río Seco - Tucumán',
    country: 'Argentina'
  },

  contact: {
    phoneDisplay: '381-5670618',
    phoneRaw: '5493815670618', // para wa.me
    whatsappMessage:
      'Hola Río de Pesca, quisiera consultar por productos de pesca/camping.'
  },

  social: {
    instagram: {
      label: 'Instagram',
      handle: 'Río.DePesca',
      url: 'https://instagram.com/rio.depesca'
    },
    facebook: {
      label: 'Facebook',
      handle: 'RíoDePesca',
      url: 'https://facebook.com/RioDePesca'
    },
    tiktok: {
      label: 'TikTok',
      handle: 'Río.DePesca',
      url: 'https://tiktok.com/@rio.depesca'
    },
    whatsapp: {
      label: 'WhatsApp',
      display: '381-5670618',
      url: 'https://wa.me/5493815670618'
    }
  },

  sections: [
    'inicio',
    'productos',
    'carnadas',
    'tips',
    'sorteos',
    'info',
    'ubicacion'
  ]
};
