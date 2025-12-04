// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'TOONLY.ONLINE - Free JSON to TOON Converter',
      titleTemplate: '%s | TOONLY.ONLINE',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' 
        },
        { 
          name: 'keywords', 
          content: 'toonly online, json to toon, json converter, toon converter, json to toon converter, online json tool, json formatter, toon format, json parser, data converter, developer tools' 
        },
        { name: 'author', content: 'TOONLY.ONLINE' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'language', content: 'English' },
        { name: 'theme-color', content: '#667eea' },
        { name: 'format-detection', content: 'telephone=no' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'TOONLY.ONLINE - Free JSON to TOON Converter' },
        { property: 'og:description', content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' },
        { property: 'og:url', content: 'https://toonly.online' },
        { property: 'og:site_name', content: 'TOONLY.ONLINE' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: 'https://toonly.online/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'TOONLY.ONLINE - JSON to TOON Converter' },
        
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TOONLY.ONLINE - Free JSON to TOON Converter' },
        { name: 'twitter:description', content: 'TOONLY.ONLINE - Convert JSON data to TOON format instantly with our free online converter. Simple, fast, and easy to use tool for developers.' },
        { name: 'twitter:image', content: 'https://toonly.online/og-image.png' },
        { name: 'twitter:image:alt', content: 'TOONLY.ONLINE - JSON to TOON Converter' },
      ],
      link: [
        { rel: 'canonical', href: 'https://toonly.online' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
        { rel: 'alternate', type: 'application/rss+xml', href: 'https://toonly.online/rss.xml' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'TOONLY.ONLINE',
            description: 'Free online tool to convert JSON data to TOON format instantly. Simple, fast, and easy to use tool for developers.',
            url: 'https://toonly.online',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            softwareVersion: '1.0',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '1',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'JSON to TOON format conversion',
              'Real-time conversion',
              'Privacy-first (client-side processing)',
              'No registration required',
              'Free to use'
            ]
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'TOONLY.ONLINE',
            url: 'https://toonly.online',
            description: 'Free online JSON to TOON format converter',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://toonly.online/?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },
  
  // Sitemap configuration
  site: {
    url: 'https://toonly.online'
  },
  
  // Modules
  modules: [
    '@nuxtjs/sitemap'
  ],
  
  // Sitemap module configuration
  sitemap: {
    hostname: 'https://toonly.online',
    gzip: true,
    routes: [
      '/',
      '/about'
    ]
  }
})
