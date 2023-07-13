export interface ISite {
    title?: string | null;
    description?: string | null;
    domain?: string | null;
    img?: string | null;
    favicon?: string | null;
    clearbit?: string | null;
    canonicalUrl: string;
    firestoreSiteId: string;
}