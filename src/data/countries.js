/* Tobler group country sites, mirrored from the live switcher on tobler-in.com
   (labels and URLs verified 2026-08-08). Each country runs its own domain —
   switching is a full external redirect, not a language toggle. Labels follow
   the group's own wording: tobler-ks.com is listed as "Albania", Türkiye keeps
   its native spelling, and Slovakia links into its /lesenia/ path. */

export const COUNTRY_GROUPS = [
  {
    label: 'Europe',
    countries: [
      { name: 'Switzerland', code: 'CH', url: 'https://www.tobler-ag.com/en/' },
      { name: 'Germany', code: 'DE', url: 'https://www.tobler-de.com/' },
      { name: 'France', code: 'FR', url: 'https://www.tobler-fr.com/' },
      { name: 'Italy', code: 'IT', url: 'https://www.tobler-it.com/' },
      { name: 'Austria', code: 'AT', url: 'https://www.tobler-at.com/' },
      { name: 'Bulgaria', code: 'BG', url: 'https://www.tobler-bg.com/' },
      { name: 'Türkiye', code: 'TR', url: 'https://www.tobler-tr.com/' },
      { name: 'Croatia', code: 'HR', url: 'https://www.tobler-hr.com/' },
      { name: 'Albania', code: 'KS', url: 'https://www.tobler-ks.com/' },
      { name: 'Slovakia', code: 'SK', url: 'https://www.tobler-sk.com/lesenia/' },
    ],
  },
  {
    label: 'International',
    countries: [
      { name: 'India', code: 'IN', url: 'https://www.tobler-in.com/', current: true },
    ],
  },
]
