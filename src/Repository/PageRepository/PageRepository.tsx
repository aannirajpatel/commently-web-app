import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { get, ref } from "firebase/database";
import { db, rdb } from '../../firebase/firebase';
import { IPage } from '../../DTO/Page/IPage';

class PageRepository {
  async getAllPages(): Promise<IPage[]> {
    const pageDocs: QuerySnapshot = await getDocs(collection(db, "pages"));
    const pagePromises = pageDocs.docs.map(async doc => {
      const pageId = doc.id;
      const pageSnap = await get(ref(rdb, `pages/${pageId}`));
      return pageSnap.val() as IPage;
    });
    const pages = await Promise.all(pagePromises);
    console.log("Received pages: ", pages);
    return pages;
  }
};

export const pageRepository = new PageRepository();
