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

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_CONTACT_TEMPLATE_ID=
VITE_EMAILJS_RFQ_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

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
