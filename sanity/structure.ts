import type { StructureResolver } from 'sanity/structure';

/**
 * Menu dello Studio: i singleton si aprono direttamente sul documento,
 * i reperti come lista ordinata per codice inventario.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Impostazioni del sito')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Pop-up eventi')
        .id('popupEvento')
        .child(S.document().schemaType('popupEvento').documentId('popupEvento')),

      S.divider(),

      S.listItem()
        .title('Pagina Home')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Pagina Storia')
        .id('storiaPage')
        .child(S.document().schemaType('storiaPage').documentId('storiaPage')),
      S.listItem()
        .title('Pagina Percorsi')
        .id('percorsiPage')
        .child(S.document().schemaType('percorsiPage').documentId('percorsiPage')),
      S.listItem()
        .title('Pagina Contatti')
        .id('contattiPage')
        .child(S.document().schemaType('contattiPage').documentId('contattiPage')),
    ]);
