import React from "react";
import { IPage } from "../../DTO/Page/IPage";

export function SiteThumbnail(siteInfo: IPage | undefined): React.ReactNode {
    return (siteInfo?.img && <img src={siteInfo?.img} alt={"favicon for " + siteInfo.canonicalUrl} />) || (siteInfo?.favicon && <img src={siteInfo?.favicon} alt={"favicon for " + siteInfo.canonicalUrl} />);
}
