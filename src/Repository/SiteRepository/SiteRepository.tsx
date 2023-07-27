import { getSite } from '../../firebase/firebase';
import { IPage } from '../../DTO/Page/IPage';
class SiteRepository {
    public async getSite(siteUrl: string): Promise<IPage> {
        return (await getSite({ siteUrl: siteUrl })).data;
    }
};

export const siteRepository = new SiteRepository();