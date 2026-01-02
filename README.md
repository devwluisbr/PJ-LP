# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID  
**Repositório GitHub**: https://github.com/devwluisbr/meuprojetoatual

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy na Vercel

- Importar repositório GitHub: devwluisbr/meuprojetoatual
- Configure:
  - Root Directory: gyn-premium-living-main
  - Framework Preset: Vite
  - Build Output: dist (já definido em vercel.json)
- Variáveis de Ambiente (Settings → Environment Variables):
  - META_PIXEL_ID = 1965047910721645
  - META_ACCESS_TOKEN = token da CAPI (Gerenciador de Eventos → API de Conversões → Gerar token)
  - VITE_SUPABASE_URL = URL do projeto Supabase
  - VITE_SUPABASE_PUBLISHABLE_KEY = chave pública (anon) do Supabase
- Clique em Deploy. Após o build, valide a URL de preview, navegação e formulário.

## Domínio personalizado

- Em Settings → Domains, adicione acchaves.com.br
- Se aparecer “Invalid Configuration”, escolha:
  - Nameservers:
    - ns1.vercel-dns.com
    - ns2.vercel-dns.com
  - Modo Avançado (A + CNAME) no Registro.br:
    - A (apex @) → 76.76.21.21
    - CNAME (www) → cname.vercel-dns.com
- Após propagar, defina acchaves.com.br como Primary Domain.

## Validações

- SEO canônico aponta para o domínio: [index.html](index.html)
- Pixel atualizado com PageView e noscript: [index.html](index.html)
- Backend CAPI lê variáveis: [api/meta-events.ts](api/meta-events.ts)
- SPA rewrites prontos: [vercel.json](vercel.json)

## Checklist

- Importar repo PJ-LP na Vercel
- Adicionar variáveis e redeploy
- Adicionar domínio acchaves.com.br
- Apontar DNS (Nameservers ou A/CNAME)
- Verificar SSL emitido e página abrindo
- Testar formulário: verificar Lead no Supabase e evento “Lead” no Pixel/CAPI
