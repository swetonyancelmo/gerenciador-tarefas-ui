<div align="center">

# ✨ Gerenciador de Tarefas

### Organize o caos. Uma tarefa de cada vez.

Interface web **moderna**, **rápida** e **segura** para criar, concluir e excluir tarefas — com autenticação JWT e integração a uma API REST.

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## Por que este projeto?

> **Não é só mais uma lista de afazeres.**  
> É um front-end pensado como produto: **Signals**, lazy loading, guards, interceptor HTTP, estados de carregamento e erros visíveis — tudo para uma experiência próxima do que você veria em times sênior.

- **Dark mode nativo** com paleta roxo/azul e UI polida  
- **Persistência real** via backend — suas tarefas voltam após recarregar a página (com API rodando)  
- **Login e cadastro** com feedback claro (loading, erros, sucesso)  
- **Rotas inteligentes**: visitantes vão para login; usuários logados não ficam presos na tela de auth  

---

## Funcionalidades

| Área | O que você encontra |
|------|---------------------|
| **Auth** | Registro, login, JWT no `localStorage`, logout |
| **Tarefas** | Listar, criar, marcar como concluída, excluir |
| **Segurança** | `authGuard` / `guestGuard`, interceptor com `Bearer` token |
| **UX** | Skeletons ao carregar, spinners nos envios, mensagens de erro dismissíveis |
| **Código** | Standalone components, `input()` / `output()`, `signal()` / `computed()` |

---

## Stack técnica

- **[Angular 21](https://angular.dev)** — SPA com componentes standalone e rotas lazy-loaded  
- **[Tailwind CSS 4](https://tailwindcss.com)** — estilização utilitária e tema customizado  
- **[RxJS](https://rxjs.dev)** — fluxos assíncronos com HTTP  
- **[Vitest](https://vitest.dev)** — testes unitários (via `ng test`)  
- **API REST** — esperada em `http://localhost:8080` (auth + `/tasks`)

---

## Pré-requisitos

- **Node.js** (recomendado: LTS atual)  
- **npm** (o projeto usa `npm@11.8.0` no `packageManager`)  
- **Backend** rodando na porta **8080** com os endpoints de autenticação e tarefas (sem ele, login e lista não funcionarão)

---

## Como rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:4200)
npm start
# ou: npx ng serve
```

Build de produção:

```bash
npm run build
```

Testes:

```bash
npm test
```

---

## Configuração da API

A URL base está centralizada em:

`src/app/core/config/api.config.ts`

Por padrão: **`http://localhost:8080`**.  
Para outro ambiente (homologação, produção), altere esse arquivo ou evolua para `environment.*.ts` se preferir.

---

## Estrutura do projeto (visão geral)

```
src/app/
├── core/                 # Transversal: auth, guards, interceptors, config
│   ├── auth/
│   └── config/
├── features/
│   ├── auth/pages/       # Login e registro
│   └── tasks/            # Lista, todo-item, TaskService, models
├── app.routes.ts
├── app.config.ts
└── app.ts
```

Arquitetura em **feature folders** + **core** compartilhado — fácil de escalar e de onboardar novos devs.

---

## Fluxo rápido para quem clona o repo

1. Sobe o **backend** na porta `8080`  
2. `npm install` → `npm start`  
3. Abre `http://localhost:4200`  
4. Cria conta ou faz login → gerencia tarefas  

---

## Licença

Projeto pessoal / educacional — use e adapte como quiser.

---

<div align="center">

**Feito com Angular 21 + Tailwind 4** · *Menos ruído, mais foco.*

</div>
