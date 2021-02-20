export const encodeSlug = (url) => {
 return url.toLowerCase().trim()
   .replace(/ /g, "-")
   .replace(/[äöüß]/g, c => ({ä:'ae',ö:'oe',ü:'ue', ß: 'ss'}[c]))
   .replace(/[^a-zA-Z\-]/g, "")
}