// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  app: {
    head: {
      title: 'JSON to Toon Converter - Free Online Tool',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Convert JSON data to toon format instantly with our free online JSON to toon converter. Simple, fast, and easy to use tool for developers.' 
        },
        { 
          name: 'keywords', 
          content: 'json to toon, json converter, toon converter, json to toon converter, online json tool, json formatter, toon format' 
        },
        { name: 'author', content: 'ToonConverter' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'English' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'JSON to Toon Converter - Free Online Tool' },
        { property: 'og:description', content: 'Convert JSON data to toon format instantly with our free online JSON to toon converter. Simple, fast, and easy to use tool for developers.' },
        { property: 'og:site_name', content: 'JSON to Toon Converter' },
        { property: 'og:locale', content: 'en_US' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'JSON to Toon Converter - Free Online Tool' },
        { name: 'twitter:description', content: 'Convert JSON data to toon format instantly with our free online JSON to toon converter. Simple, fast, and easy to use tool for developers.' },
      ],
      link: [
        { rel: 'canonical', href: 'https://toonconverter.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'JSON to Toon Converter',
            description: 'Free online tool to convert JSON data to toon format',
            url: 'https://toonconverter.com',
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
