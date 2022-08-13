/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https:/wasserrettung-pottendorf.at',
    generateRobotsTxt: true,
}

export default config