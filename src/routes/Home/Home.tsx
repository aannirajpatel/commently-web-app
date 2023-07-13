import React, { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { getSite } from "../../firebase/firebase";
export function Home() {

    const [data, setData] = useState("");

    useEffect(() => {
        getSite({ siteUrl: "https://andrejgajdos.com/how-to-create-a-link-preview/" }).then((result) => {
            setData(JSON.stringify(result.data))
        }).catch(e => console.warn(e));
    });


    return (<>
        <div>
            <Label as='a' color='blue' image>
                <img src='https://react.semantic-ui.com/images/avatar/small/veronika.jpg' alt="" />
                Veronika
                <Label.Detail>Friend</Label.Detail>
            </Label>
            <Label as='a' color='teal' image>
                <img src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' alt="" />
                Jenny
                <Label.Detail>Friend</Label.Detail>
            </Label>
            <Label as='a' image>
                <img src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' alt="" />
                Christian
                <Label.Detail>Co-worker</Label.Detail>
            </Label>
            {"Hi: " + data}
        </div>
    </>)
}