import { SITE } from '../data/site.js'

const ORIGIN = 'https://www.toblerindia.com'

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${SITE.name} India`,
    url: ORIGIN,
    logo: `${ORIGIN}/favicon.svg`,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
    },
    sameAs: Object.values(SITE.social),
  }
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `${ORIGIN}${item.path}` : undefined,
    })),
  }
}

export function buildProductSchema({ product, subcategory, category, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    category: `${category.name} / ${subcategory.name}`,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    url: `${ORIGIN}${path}`,
    additionalProperty: (product.specifications || []).map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  }
}
