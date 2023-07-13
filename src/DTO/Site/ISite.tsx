export interface ISite {
    title?: string | null;
    description?: string | null;
    domain?: string | null;
    img?: string | null;
    favicon?: string | null;
    canonicalUrl: string;
    firestoreSiteId: string;
}