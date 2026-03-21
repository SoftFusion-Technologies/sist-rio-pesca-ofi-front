/*
 * Programador: Benjamin Orellana
 * Fecha Actualización: 21 / 03 / 2026
 * Versión: 1.0
 *
 * Descripción:
 * Fuente de datos del módulo FAQ.
 * Cada objeto representa una pregunta frecuente y deja la estructura
 * preparada para agregar, editar o reorganizar preguntas en el futuro
 * sin tocar la UI del page.
 */

export const FAQ_CATEGORIES = [
  // { id: 'all', label: 'Todas' },
  // { id: 'compras', label: 'Compras' },
  { id: 'cambios', label: 'Cambios y devoluciones' }
];

export const FAQ_ITEMS = [
  // {
  //   id: 1,
  //   category: 'compras',
  //   question: '¿Qué puedo hacer si no recibí o borré mi factura de compra?',
  //   answer: [
  //     {
  //       type: 'paragraph',
  //       text: 'Si no recibiste tu factura o la eliminaste por error, podés comunicarte con nosotros indicando los datos de la compra para que podamos ayudarte a localizarla.'
  //     },
  //     {
  //       type: 'paragraph',
  //       text: 'Te recomendamos tener a mano el nombre del comprador, fecha aproximada, producto adquirido y cualquier dato adicional que facilite la búsqueda.'
  //     }
  //   ]
  // },
  {
    id: 2,
    category: 'cambios',
    question: '¿Qué productos no se pueden cambiar?',
    answer: [
      {
        type: 'paragraph',
        text: 'La devolución no será aplicable a:'
      },
      {
        type: 'list',
        items: [
          'Productos que hayan sido utilizados causando el deterioro del mismo de manera que haya perdido su calidad de “nuevo”.',
          'Productos que hayan sido utilizados para un uso diferente para el que fueron diseñados.',
          'Productos que hayan sido utilizados en forma incorrecta de acuerdo a lo que indica el fabricante en el manual del usuario.',
          'La prestación de servicios, una vez que el mismo haya sido completamente ejecutado o cuando la ejecución haya comenzado, con previo consentimiento expreso del consumidor.',
          'Insumos que hayan sido utilizados.'
        ]
      }
    ]
  },
  {
    id: 3,
    category: 'cambios',
    question: '¿Qué productos no se pueden devolver o cambiar?',
    answer: [
      {
        type: 'paragraph',
        text: 'Casi todos los productos se pueden devolver o cambiar mientras estén sin utilizar y en perfectas condiciones, incluyendo accesorios, documentación y embalaje original.'
      },
      {
        type: 'paragraph',
        text: 'Aunque existen excepciones.'
      }
    ]
  },
  {
    id: 4,
    category: 'cambios',
    question:
      '¿Qué documentación tengo que presentar para devolver o cambiar un producto?',
    answer: [
      {
        type: 'paragraph',
        text: 'Para gestionar un cambio o devolución, es recomendable presentar el comprobante de compra y acercar el producto en las mismas condiciones en las que fue entregado.'
      },
      {
        type: 'paragraph',
        text: 'Si tu cliente maneja una política específica, este texto conviene reemplazarlo por el contenido oficial.'
      }
    ]
  }
];
