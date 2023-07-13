import React from "react";
import { ISite } from "../../DTO/Site/ISite";

export function SiteDescription(siteInfo: ISite | undefined): React.ReactNode {
    return siteInfo?.description && <p>{siteInfo.description}</p>;
}
