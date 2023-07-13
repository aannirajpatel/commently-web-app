import { getSite } from '../../firebase/firebase';
import { ISite } from '../../DTO/Site/ISite';
class SiteRepository {
    public async getSite(siteUrl: string): Promise<ISite> {
        return (await getSite({ siteUrl: siteUrl })).data;
    }
};

export const siteRepository = new SiteRepository();