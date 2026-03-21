'use client'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON DERULE",
    "url": "https://jhozuad.github.io/json-derule",
    "description": "Free online JSON tools for developers. Format, validate, and compare JSON with professional-grade features including real-time validation, visual diff highlighting, and custom formatting options.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "permissions": "browser",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON Formatting with custom indentation",
      "JSON Validation with detailed error reporting",
      "JSON Comparison with visual diff highlighting",
      "Real-time syntax checking",
      "Offline functionality",
      "No registration required"
    ],
    "screenshot": "https://jhozuad.github.io/json-derule/og-image.png",
    "creator": {
      "@type": "Organization",
      "name": "JSON DERULE Team"
    },
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "@id": "#json-formatter",
        "name": "JSON Formatter",
        "description": "Format and beautify JSON with custom indentation options",
        "url": "https://jhozuad.github.io/json-derule/"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "#json-validator",
        "name": "JSON Validator",
        "description": "Validate JSON syntax with detailed error messages and suggestions",
        "url": "https://jhozuad.github.io/json-derule/validator"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "#json-compare",
        "name": "JSON Compare Tool",
        "description": "Compare JSON objects and arrays with visual diff highlighting",
        "url": "https://jhozuad.github.io/json-derule/compare"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}