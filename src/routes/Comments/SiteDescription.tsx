import React from "react";
import { IPage } from "../../DTO/Page/IPage";

export function SiteDescription(siteInfo: IPage | undefined): React.ReactNode {
    return siteInfo?.description && <p>{siteInfo.description}</p>;
}
