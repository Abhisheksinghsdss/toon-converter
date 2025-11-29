// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'TOONLY.ONLINE - Free JSON to TOON Converter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' 
        },
        { 
          name: 'keywords', 
          content: 'toonly online, json to toon, json converter, toon converter, json to toon converter, online json tool, json formatter, toon format' 
        },
        { name: 'author', content: 'TOONLY.ONLINE' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'English' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'TOONLY.ONLINE - Free JSON to TOON Converter' },
        { property: 'og:description', content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' },
        { property: 'og:site_name', content: 'TOONLY.ONLINE' },
        { property: 'og:locale', content: 'en_US' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TOONLY.ONLINE - Free JSON to TOON Converter' },
        { name: 'twitter:description', content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' },
      ],
      link: [
        { rel: 'canonical', href: 'https://toonly.online' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'TOONLY.ONLINE',
            description: 'Free online tool to convert JSON data to TOON format',
            url: 'https://toonly.online',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '1'
            }
          })
        }
      ]
    }
  }
})
