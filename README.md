# Tobler India Website

Premium Swiss-engineered scaffolding & formwork corporate website. React + Vite + Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill it in. `.env` is gitignored — never put
credentials in this README or any other tracked file.

EmailJS runs **server-side only** (`api/enquiry.js` on Vercel), so its variables
carry **no `VITE_` prefix** — a `VITE_` value is compiled into the public bundle:

```
EMAILJS_SERVICE_ID=
EMAILJS_CONTACT_TEMPLATE_ID=
EMAILJS_RFQ_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

Dashboard walkthrough, ready-to-paste templates and a verifier:
[`docs/emailjs/README.md`](docs/emailjs/README.md). In production these live in
Vercel → Settings → Environment Variables, not in a file.
## Project Structure

```
src/
├── assets/          Images, icons, fonts
├── components/      common, layout, navigation, sections, forms, ui
├── constants/        navigation, products, industries, projects, team, timeline
├── hooks/            Reusable hooks
├── layouts/          MainLayout wrapper
├── pages/            Home, About, Industries, Products, Projects, Contact
├── routes/           AppRoutes definition
├── services/         emailService (EmailJS)
├── utils/            Helper functions
└── styles/           Global styles
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- EmailJS (Phase 1 forms)
- Lucide React (icons)

## Future Phases

Spring Boot backend, MySQL, CMS, Authentication, Admin Dashboard, Product Management, Career Management, CRM/ERP integration, Analytics Dashboard, Multi-language support.





## Claude Instruction

## 1 Token & Execution Policy

- Read `README.md` first and treat it as the project's source of truth.
- Never scan the entire repository.
- Avoid project-wide searches whenever possible. Perform them only if absolutely necessary to complete the current task.
- Open only the minimum required file(s) for the current task.
- If another file is required, ask before opening it.
- Reuse existing code and make the smallest possible production-ready change.
- Do not refactor unrelated code.
- Do not modify files outside the requested scope.
- Keep responses concise and code-focused.
- When a task is complete, stop immediately and wait for the next instruction. Do not continue proactively.

## 2 Development Phase

The project is under active development.

Until I explicitly say **"Final QA Stage"**:

- Do NOT run build.
- Do NOT run lint.
- Do NOT run tests.
- Do NOT start the dev server.
- Do NOT open a browser.
- Do NOT perform smoke tests.
- Do NOT verify the entire application.
- Do NOT repeatedly test after every change.
- Do NOT execute any command unless I explicitly ask.

Assume I will handle all validation myself.

When I say **"Final QA Stage"**, then perform comprehensive validation, including builds, linting, testing, browser verification, regression checks, and end-to-end testing.

## 3  Token Optimization

- Never read the same file twice unless it has changed.
- Do not search for references, usages, or dependencies unless the current task requires them.
- Stop immediately after completing the requested task. Do not suggest additional improvements or continue with related work.
- If multiple implementation approaches exist, choose the one that requires the least repository exploration while maintaining production quality.