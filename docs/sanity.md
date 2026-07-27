# Sanity — configurazione e uso

Tutti i contenuti del sito (reperti, testi delle pagine, orari, indirizzo, menu)
stanno su Sanity. Lo Studio per modificarli è incorporato nel sito, su `/studio`.

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

Carica i 59 reperti con le loro foto e compila le pagine con i testi che prima
erano scritti nel codice. Dura qualche minuto: carica una sessantina di immagini.

Lo script è idempotente (usa `_id` fissi come `reperto-INV-001`), quindi si può
rieseguire senza creare duplicati — ma **sovrascrive** le modifiche fatte a mano
nello Studio.

### 5. Controllare

```bash
npm run dev
```

Aprire <http://localhost:3000/studio>: devono comparire i 59 reperti e le cinque
voci di impostazioni/pagine. Poi controllare le pagine del sito.

## Uso quotidiano

Lo Studio è su `/studio`. Il menu è diviso in:

- **Impostazioni del sito** — orari, indirizzo, email, telefono, voci di menu,
  footer. Gli orari sono **un unico posto**: compaiono in home, in contatti e nel
  footer, e cambiarli qui li cambia in tutti e tre.
- **Pagine** — Home, Storia, Collezione, Contatti: i testi di ciascuna.
- **Reperti** — i 59 oggetti, ordinati per codice inventario.

Email e telefono sono volutamente vuoti: finché restano così, il sito non mostra
i relativi link. Basta compilarli per farli comparire.

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
| Projection | `{_type, inventoryId}` |

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
| `scripts/` | import iniziale (usa e getta) |

## Note su Next.js 16

Due dettagli che valgono in questo progetto e cambiano rispetto alle versioni
precedenti di Next:

- `fetch` **non** è cachato di default: la cache si ottiene passando
  `next: { tags, revalidate }`, come fa `lib/sanity-fetch.ts`.
- `revalidateTag` vuole due argomenti (`revalidateTag(tag, 'max')`); la forma a
  un solo argomento è deprecata.
