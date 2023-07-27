export interface IPage {
    title?: string | null;
    description?: string | null;
    domain?: string | null;
    clearbit?: string | null;
    img?: string | null;
    favicon?: string | null;
    canonicalUrl: string;
    pageId: string;
}