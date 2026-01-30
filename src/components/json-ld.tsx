export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Gading (DexPie)",
        "url": "https://dexpie.web.id",
        "sameAs": [
            "https://github.com/dexpie",
            "https://twitter.com/dexpie",
            "https://www.linkedin.com/in/gading-putra-priyanto/",
            "https://instagram.com/oldest.in"
        ],
        "jobTitle": "Creative Technologist",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "description": "Creative Technologist and Full Stack Developer specializing in modern web experiences.",
        "image": "https://dexpie.web.id/avatar.png",
        "website": {
            "@type": "WebSite",
            "name": "DexPortal",
            "url": "https://dexpie.web.id",
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
