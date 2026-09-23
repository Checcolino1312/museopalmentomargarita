# Sanity — configurazione e uso

Tutti i contenuti del sito (testi delle pagine, orari, indirizzo, menu,
immagini) stanno su Sanity. Lo Studio per modificarli è incorporato nel sito, su `/studio`.

## Primo avvio

Da fare una volta sola, in quest'ordine.

### 1. Creare il progetto Sanity

```bash
npx sanity@latest init
```

Alla richiesta scegliere di **collegarsi a un progetto nuovo**, dataset
`production`. Se chiede di sovrascrivere file esistenti, **rifiutare**: schema e
configurazione sono già nel repository.

Se si preferisce, il progetto si può creare a mano su
[manage.sanity.io](https://manage.sanity.io) e prendere solo il `projectId`.

### 2. Creare il token di scrittura

Su manage.sanity.io → **API** → **Tokens** → *Add API token*, con permessi di
scrittura. Serve solo per l'import del punto 4: in produzione non serve.

### 3. Compilare `.env.local`

```bash
cp .env.local.example .env.local
```

Poi riempire `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_WRITE_TOKEN` e
`SANITY_REVALIDATE_SECRET` (una stringa casuale qualsiasi).

`.env.local` è ignorato da git e non finisce nel repository.

### 4. Importare i contenuti

```bash
npm run sanity:import
```

Compila le pagine con i testi che prima erano scritti nel codice.

Lo script è idempotente (usa `_id` fissi come `homePage`), quindi si può
rieseguire senza creare duplicati — ma **sovrascrive** le modifiche fatte a mano
nello Studio.

### 5. Controllare

```bash
npm run dev
```

Aprire <http://localhost:3000/studio>: devono comparire le voci di impostazioni
e pagine. Poi controllare le pagine del sito.

## Uso quotidiano

Lo Studio è su `/studio`. Il menu è diviso in:

- **Impostazioni del sito** — indirizzo, WhatsApp, email, telefono, orari di
  contatto, voci di menu, footer.
- **Pop-up eventi** — l'avviso in sovrimpressione sulla home. Vedi sotto.
- **Pagine** — Home, Storia, Percorsi, Contatti.

Email e telefono sono volutamente vuoti: finché restano così, il sito non mostra
i relativi link. Basta compilarli per farli comparire.

### Orari: sono di contatto, non di apertura

Il museo riceve **su appuntamento**. Il campo `orari` non indica quindi
l'apertura al pubblico ma quando si può telefonare o scrivere, e compare **solo
nella pagina Contatti**: mostrarlo in home o nel footer farebbe credere che il
museo sia aperto in quelle fasce.

### Testi lunghi: il «+ Continua a leggere»

Titolo e inizio del testo sono **sempre visibili**. Solo il seguito può stare
nascosto dietro un comando «+ Continua a leggere», che da aperto diventa
«Riduci». Si comanda con l'interruttore **Nascondi il seguito dietro il «+»**,
presente su ogni sezione della Storia e sull'introduzione della Home.

Quanto resta visibile lo decide il sito da sé: si tengono aperti capoversi
interi finché si superano i 250 caratteri, così chi legge trova sempre qualcosa
di compiuto. E se quel che resterebbe nascosto è meno di 200 caratteri, **non si
nasconde niente**: un comando che rivela due righe fa perdere più tempo di
quanto ne faccia risparmiare. Per questo la sezione «La località», che è breve,
resta tutta aperta anche con l'interruttore acceso.

Il testo nascosto resta comunque nella pagina: Google lo legge e la ricerca del
browser lo trova. Chiuderlo non lo sottrae ai motori di ricerca.

Le attività della pagina Percorsi funzionano diversamente, perché sono un
elenco per categorie e non un testo continuo: sono organizzate in **gruppi**
richiudibili, col primo aperto di partenza. Titoli e composizione dei gruppi si
cambiano dallo Studio.

### Testo sopra una fotografia

La citazione della Home (mission) e quella della pagina Storia possono essere
scritte sopra una foto: basta caricarla nel campo **Foto di sfondo**. Un velo
scuro viene applicato da solo per tenere il testo leggibile.

Senza foto il blocco resta su fondo verde pieno — non si rompe nulla, cambia
solo l'aspetto.

### Pop-up eventi

Serve per annunci temporanei. L'interruttore è **Mostra il pop-up**: finché è
spento non appare nulla, quindi si può preparare in anticipo e accendere al
momento giusto.

Chi lo chiude non lo rivede più. Il ricordo è legato al **titolo**: cambiando
titolo, il pop-up ricompare anche a chi aveva già chiuso il precedente. Per un
evento nuovo, quindi, basta cambiare il titolo.

## Dare accesso al museo

Su manage.sanity.io → **Members** → *Invite*. Sul piano gratuito gli unici ruoli
disponibili sono `Administrator` e `Viewer`: `Viewer` è in sola lettura, quindi
per poter modificare i contenuti serve `Administrator`. Questo significa che chi
viene invitato ha pieni poteri, inclusa la cancellazione di documenti — il ruolo
`Editor`, limitato ai soli contenuti, richiede il piano Growth a pagamento.

Per questo conviene tenere un backup periodico:

```bash
npm run sanity:backup
```

## Aggiornamento automatico del sito

Perché il sito si aggiorni subito dopo una pubblicazione, va configurato un
webhook su manage.sanity.io → **API** → **Webhooks**:

| Campo | Valore |
| --- | --- |
| URL | `https://<dominio>/api/revalidate` |
| Dataset | `production` |
| Trigger | create, update, delete |
| Secret | lo stesso valore di `SANITY_REVALIDATE_SECRET` |
| Projection | `{_type}` |

Senza webhook i contenuti si aggiornano comunque, ma entro un'ora
(`revalidate: 3600` in `lib/sanity-fetch.ts`).

## Struttura dei file

| Percorso | Contenuto |
| --- | --- |
| `sanity/schemaTypes/` | schema dei contenuti |
| `sanity/client.ts` | client di lettura |
| `sanity/image.ts` | costruzione degli URL immagine |
| `sanity.config.ts` | configurazione dello Studio |
| `lib/queries.ts` | query GROQ e tag di cache |
| `lib/sanity-fetch.ts` | fetch con la cache di Next |
| `app/api/revalidate/` | webhook di revalidation |
| `scripts/` | import e manutenzione dei contenuti |

### Script disponibili

| Comando | Cosa fa |
| --- | --- |
| `npm run sanity:import` | import iniziale dei testi. **Sovrascrive tutto**: non va più rilanciato ora che ci sono modifiche fatte nello Studio |
| `npm run sanity:contenuti` | aggiorna i testi delle pagine campo per campo, lasciando intatto il resto |
| `npm run sanity:immagini` | carica le immagini da `public/immagini/` e le assegna alle sezioni |
| `npm run sanity:fix-keys` | ripara gli elementi di array privi di `_key` («Missing keys» nello Studio) |
| `npm run sanity:pulizia` | referto sul dataset e cancellazione delle immagini non più usate da nessuna pagina |
| `npm run sanity:coerenza` | controlla che schema, dati e query siano allineati. Non scrive nulla |
| `npm run sanity:backup` | esporta il dataset |

`sanity:contenuti`, `sanity:immagini`, `sanity:fix-keys` e `sanity:pulizia`
mostrano un'anteprima e scrivono solo con `-- --apply`. La cancellazione degli
asset è **irreversibile**: il referto senza `--apply` serve a controllare prima.

### Dopo ogni modifica allo schema

```bash
npm run sanity:coerenza
```

Controlla tre scollamenti che non danno errore ma si notano tardi e male:

- un campo rimasto nei dati che lo schema non prevede più → lo Studio si riempie
  di avvisi «campo non previsto»
- un campo nello schema che nessuna query chiede → il museo lo compila, pubblica,
  e non compare da nessuna parte senza capire perché
- un tipo di documento senza tag di cache → il webhook non lo aggiorna mai, e le
  modifiche restano invisibili fino allo scadere dell'ora

C'è poi `npx tsx scripts/logo-trasparente.ts <ingresso> <uscita>`, che toglie lo
sfondo a un logo a tinta unita: serve quando il file consegnato ha il fondo
bianco pieno, che sul crema del sito si vedrebbe come un rettangolo.

E `npx tsx scripts/genera-icone.ts`, che dal logo ricava la favicon (solo lo
stemma, ritagliato quadrato: a 16 pixel il logo intero è illeggibile) e
l'immagine di condivisione 1200×630. Da rilanciare se il logo cambia.

## Statistiche

Il sito usa **Vercel Analytics** (`@vercel/analytics`, montato in
`app/(site)/layout.tsx`). Non usa cookie, quindi non servono banner di consenso
né cookie policy.

Va attivato una volta dal pannello Vercel: Project → **Analytics** → *Enable*.
Senza quel passaggio il componente non raccoglie nulla. Lo Studio non è
tracciato: il componente sta solo nel layout del sito pubblico.

## Note su Next.js 16

Due dettagli che valgono in questo progetto e cambiano rispetto alle versioni
precedenti di Next:

- `fetch` **non** è cachato di default: la cache si ottiene passando
  `next: { tags, revalidate }`, come fa `lib/sanity-fetch.ts`.
- `revalidateTag` vuole due argomenti (`revalidateTag(tag, 'max')`); la forma a
  un solo argomento è deprecata.
