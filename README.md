# DADODADO — Website (Next.js + React + TS + Tailwind)

Site institucional com foco em **inteligência de dados** (Pêndulo Digital, Lupa Social, Pulso Público, Rastro 360), **blog**, **páginas de serviços/produto**, **sobre**, **contato** (com formulário) e **CTA**. Visual baseado na paleta:

- **Primário (fundo escuro):** `#170d4d`  
- **Secundário (fundo claro):** `#d9d9d9`  
- **Cor principal / logo:** `#3b25a1`  
- **Detalhes / acento:** `#38d4b0`  
- **Subtítulo:** `#5e5b5b`

Inclui **animações de aparecimento** (Reveal + StaggerList), **gradientes de transição entre seções**, **Nav sobreposto**, **WhatsAppButton** (fixo ou centralizado no card) e **fontes Montserrat** via `next/font`.

---

## ✨ Stack

- **Next.js 13+/14+** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **lucide-react** (ícones)
- **next/font** (Montserrat)
- **Animações on-scroll** via componentes utilitários:
  - `Reveal` (IntersectionObserver / motion-safe)
  - `StaggerList` (efeito “stagger” nos filhos)

---

## 🚀 Começando

```bash
# 1) Clonar
git clone <repo-url> && cd <pasta-do-projeto>

# 2) Instalar deps
pnpm install
# ou: npm install / yarn

# 3) Rodar em dev
pnpm dev
# http://localhost:3000

# 4) Build
pnpm build

# 5) Preview do build
pnpm start
```

> Recomendado: **Node 18+** e **pnpm 8+**.

---

## 🗂 Estrutura (simplificada)

```
app/
  layout.tsx
  page.tsx                 # Home
  contato/page.tsx         # Contato (form, FAQ, WhatsApp)
  sobre/page.tsx           # Sobre (Team, metodologia, etc.)
  servicos/
    page.tsx               # Landing Serviços
    pendulo-digital/page.tsx
    lupa-social/page.tsx
    pulso-publico/page.tsx
    rastro-360/page.tsx
  Blogs/
    page.tsx               # Blog index
    [slug]/page.tsx        # Blog post

components/
  Nav.tsx
  Footer.tsx
  CTA.tsx
  Hero.tsx
  sections/
    TheChallenge.tsx
    OurResponse.tsx
    Solutions.tsx
    Differentials.tsx
    Impact.tsx
    Team.tsx
  forms/
    ContactForm.tsx
  ux/
    Reveal.tsx
    StaggerList.tsx
    WhatsAppButton.tsx

content/
  posts.ts                 # Conteúdo do blog tipado

public/
  logo.png
  bghero.png
  blog/covers/*.jpg        # Capas dos posts
```

---

## 🎨 Estilo & Tema

- **Tailwind** com tokens direto nos componentes (cores acima).  
- **Fonte Montserrat** (global):
  ```ts
  // app/layout.tsx
  import { Montserrat } from 'next/font/google';
  const mont = Montserrat({ subsets: ['latin'], variable: '--font-mont' });
  export default function RootLayout({ children }) {
    return <html lang="pt-BR"><body className={mont.variable}>{children}</body></html>;
  }
  ```
- **Transições entre seções:** componente utilitário `SectionGradient` (inline) para *dividers* com gradiente linear/radial.

---

## 🧩 Componentes-chave

### Nav (sobreposto)
- `position: absolute` no topo da página, **visível sobre qualquer BG**.
- `bg-black/30` + `backdrop-blur` quando houver conteúdo abaixo (controle por classe utilitária do wrapper/hero).

### Reveal & StaggerList
- `Reveal`: exibe elemento quando entra na viewport (com *motion-safe*).
- `StaggerList`: aplica delays incrementais nos filhos.
- Uso:
  ```tsx
  <Reveal delay={120}><h2>Seção</h2></Reveal>

  <StaggerList step={90} y={16} className="mt-8 grid gap-6 ...">
    {items.map(i => <Card key={i.id} {...i} />)}
  </StaggerList>
  ```

### WhatsAppButton
- Fixo na viewport **ou** centralizado num card.
- Props:
  - `phone="5511999999999"`
  - `message="Olá! Vim pelo site da DADODADO..."`
  - `position="br" | "bl" | "tr" | "tl" | "center"`
  - `strategy="fixed" | "absolute"`
- Ex.: centralizado dentro de um card:
  ```tsx
  <div className="relative rounded-2xl p-6 bg-white/5">
    <WhatsAppButton
      phone="5511999999999"
      position="center"
      strategy="absolute"
    />
  </div>
  ```

---

## 📝 Conteúdo do Blog

Posts tipados em `content/posts.ts`:

```ts
export type Section = { heading: string; paragraphs: string[]; };
export type Post = {
  slug: string;
  title: string;
  keyword: string;
  summary: string;
  cover: string;
  coverAlt?: string;
  sections: Section[];
  cta?: { label: string; href: string };
  updatedAt?: string; // YYYY-MM-DD
};
```

- Para **adicionar** um post: inserir novo item no array `posts`, criar imagem em `/public/blog/covers/<slug>.jpg`.
- Rotas estáticas são geradas por `generateStaticParams`. Metadados por `generateMetadata` (na página `[slug]`).

---

## 📄 Páginas de Produto

- **Pêndulo Digital** (SIR) — *score* de influência por dimensões, variação e explicações.
- **Lupa Social** — sentimento (polaridade + intensidade), temas/frames.
- **Pulso Público** — surveys online, plano amostral, calibração.
- **Rastro 360** — rastreamento de narrativas, rotas e hubs.

Cada página segue o mesmo padrão: **Hero**, **o que é**, **como funciona**, **casos de uso**, **planos/CTA**.  
Os CTAs respeitam a paleta e usam `Reveal/StaggerList`.

---

## ✉️ Formulário de Contato

- Componente `ContactForm` (client component) e rota `POST /api/contact` (implementar).
- **Honeypot** anti-spam (`companyWebsite`).
- Validação básica de campos.

Exemplo de rota (stub):

```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: enviar email / gravar em CRM
  return NextResponse.json({ ok: true });
}
```

> **Dica:** integrar com um serviço de e-mail (Resend/SendGrid), Sheet ou CRM.  
> Opcional: reCAPTCHA (adicione validação no handler e chaves em variáveis de ambiente).

---

## 🔎 Acessibilidade & SEO

- `aria-label` nos botões icônicos (WhatsApp).
- Respeito a `prefers-reduced-motion` nos utilitários de animação.
- Metadados por página (ex.: `app/contato/page.tsx` exporta `metadata`).
- Estrutura semântica (headings, `main`, `section`).

---

## 🧪 Qualidade

```bash
pnpm lint     # ESLint
pnpm format   # Prettier (se configurado)
```

> Configure `.eslintrc` e `.prettierrc` conforme seu padrão.

---

## ☁️ Deploy

- **Vercel** (recomendado): zero-config para Next.js.
- **Build output:** `next build`
- Variáveis de ambiente (se usar APIs): configure em **Project Settings → Environment Variables**.

---

## ⚙️ Configurando Cores/Marca

Busca & substitui rápida (Tailwind classes/hex):

- `#170d4d` (fundo escuro)
- `#d9d9d9` (texto claro)
- `#3b25a1` (primário)
- `#38d4b0` (acento)

Ou crie **tokens** no `tailwind.config.js` (extend theme → colors) e troque classes por `text-brand`, `bg-brand`, etc.

---

## 📦 Dependências principais

```bash
pnpm add next react react-dom
pnpm add -D typescript @types/react @types/node tailwindcss postcss autoprefixer
pnpm add lucide-react
```

*(Reveal/StaggerList/WhatsAppButton já inclusos no repo; não requerem libs externas.)*

---

## 📣 Suporte & Contribuição

- Issues e PRs são bem-vindos.
- Siga o padrão de commits e abra PR com descrição do que foi alterado/visual.

---

## ✅ Checklist Rápido

- [ ] Definir `logo.png` e `bghero.png` em `public/`
- [ ] Ajustar contatos reais (e-mail, WhatsApp)
- [ ] Implementar `/api/contact`
- [ ] Subir capas dos posts em `/public/blog/covers/`
- [ ] Revisar SEO (titles/description por página)
- [ ] Configurar domínio e deploy (Vercel)