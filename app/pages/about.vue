<template>
  <div class="about-container">
    <div class="about-content">
      <header class="about-header">
        <NuxtLink to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Converter
        </NuxtLink>
        <h1 class="about-title">TOONLY.ONLINE</h1>
        <p class="about-tagline">Your Free JSON to TOON Format Converter</p>
      </header>

      <main class="about-main">
        <section class="about-section">
          <h2>About TOONLY.ONLINE</h2>
          <p>
            TOONLY.ONLINE is a free, fast, and easy-to-use online tool designed to convert JSON data 
            into TOON format instantly. Built with modern web technologies, we provide a seamless 
            experience for developers, data analysts, and anyone working with JSON data.
          </p>
        </section>

        <section class="about-section">
          <h2>What is TOON Format?</h2>
          <p>
            TOON format is a structured, human-readable representation of JSON data optimized for 
            visualization and processing. It provides a clear, tree-like structure that makes it 
            easier to understand complex JSON hierarchies, with support for:
          </p>
          <ul class="feature-list">
            <li>Nested objects and arrays</li>
            <li>Type information display</li>
            <li>ASCII tree-style formatting</li>
            <li>Customizable indentation</li>
            <li>Array display modes (inline or block)</li>
          </ul>
        </section>

        <section class="about-section">
          <h2>Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Fast Conversion</h3>
              <p>Instantly convert JSON to TOON format with real-time processing</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Modern UI</h3>
              <p>Beautiful, responsive design that works on all devices</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>All processing happens in your browser - your data never leaves your device</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h3>Customizable</h3>
              <p>Adjust indentation, display modes, and formatting options to your preference</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📋</div>
              <h3>Easy Export</h3>
              <p>Copy to clipboard or download your converted TOON format with one click</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✨</div>
              <h3>JSON Tools</h3>
              <p>Built-in JSON beautifier, minifier, and validator for your convenience</p>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2>How to Use</h2>
          <ol class="usage-steps">
            <li>Enter or paste your JSON data into the input editor</li>
            <li>Use the tools panel to beautify, minify, or validate your JSON</li>
            <li>Adjust settings like indentation size and display preferences</li>
            <li>Click "Convert to TOON" to transform your JSON</li>
            <li>Copy or download the converted TOON format output</li>
          </ol>
        </section>

        <section class="about-section">
          <h2>Tech Stack</h2>
          <p>
            TOONLY.ONLINE is built with cutting-edge web technologies to ensure the best 
            performance and user experience:
          </p>
          <ul class="tech-list">
            <li><strong>Nuxt 4</strong> - The Intuitive Vue Framework</li>
            <li><strong>Vue 3</strong> - Progressive JavaScript Framework</li>
            <li><strong>TypeScript</strong> - Type-safe development</li>
            <li><strong>Modern CSS</strong> - Responsive and beautiful design</li>
          </ul>
        </section>

        <section class="about-section">
          <h2>Privacy & Security</h2>
          <p>
            Your privacy is important to us. TOONLY.ONLINE processes all data entirely in your 
            browser using client-side JavaScript. This means:
          </p>
          <ul class="privacy-list">
            <li>No data is sent to any server</li>
            <li>No data is stored or logged</li>
            <li>Your JSON data remains completely private</li>
            <li>No cookies or tracking required</li>
          </ul>
        </section>

        <section class="about-section">
          <h2>Free & Open</h2>
          <p>
            TOONLY.ONLINE is completely free to use with no limitations, registration, or hidden 
            costs. We believe in providing powerful tools that are accessible to everyone.
          </p>
        </section>

        <div class="cta-section">
          <NuxtLink to="/" class="cta-button">
            Start Converting Now
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'About - TOONLY.ONLINE'
})
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.about-content {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #764ba2;
}

.about-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.about-tagline {
  font-size: 1.25rem;
  color: #6b7280;
  font-weight: 500;
}

.about-main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about-section {
  line-height: 1.8;
}

.about-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.about-section p {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.feature-list,
.tech-list,
.privacy-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.feature-list li,
.tech-list li,
.privacy-list li {
  font-size: 1.125rem;
  color: #4b5563;
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
}

.feature-list li::before,
.tech-list li::before,
.privacy-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 1.25rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9375rem;
  color: #6b7280;
  margin: 0;
}

.usage-steps {
  list-style: none;
  padding-left: 0;
  counter-reset: step-counter;
}

.usage-steps li {
  font-size: 1.125rem;
  color: #4b5563;
  padding: 1rem 0;
  padding-left: 3rem;
  position: relative;
  counter-increment: step-counter;
}

.usage-steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.cta-section {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }

  .about-content {
    padding: 2rem 1.5rem;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-section h2 {
    font-size: 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .usage-steps li {
    padding-left: 2.5rem;
  }

  .usage-steps li::before {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.75rem;
  }
}
</style>
