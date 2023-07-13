import React from "react";
import { ISite } from "../../DTO/Site/ISite";

export function SiteThumbnail(siteInfo: ISite | undefined): React.ReactNode {
    return (siteInfo?.img && <img src={siteInfo?.img} alt={"favicon for " + siteInfo.canonicalUrl} />) || (siteInfo?.favicon && <img src={siteInfo?.favicon} alt={"favicon for " + siteInfo.canonicalUrl} />);
}
