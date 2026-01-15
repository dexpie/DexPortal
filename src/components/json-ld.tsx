export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Gading (DexPie)",
        "url": "https://dexportal.vercel.app",
        "sameAs": [
            "https://github.com/dexpie",
            "https://twitter.com/dexpie",
            "https://linkedin.com/in/dexpie",
            "https://instagram.com/dexpie"
        ],
        "jobTitle": "Creative Technologist",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "description": "Creative Technologist and Full Stack Developer specializing in modern web experiences.",
        "image": "https://dexportal.vercel.app/avatar.png",
        "website": {
            "@type": "WebSite",
            "name": "DexPortal",
            "url": "https://dexportal.vercel.app",
            "author": {
                "@type": "Person",
                "name": "Gading"
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
