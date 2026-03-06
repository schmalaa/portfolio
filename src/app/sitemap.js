export default function sitemap() {
    return [
        {
            url: 'https://alexschmaltz.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://alexschmaltz.com/status',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
