export const encodeSlug = (url) => {
 return url.toLowerCase().trim().replace(/ /g, "-").replace(/[^a-zA-Z\-]/g, "")
}