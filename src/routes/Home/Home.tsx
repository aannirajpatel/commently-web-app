import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Label } from "semantic-ui-react";
import { IPage } from "../../DTO/Page/IPage";
import { getCommentsPagePath } from "../../shared/Pages";
import Feed from "./components/Feed";

const defaultFeed: IPage[] = [
    {
        "canonicalUrl": "https://www.cnn.com/2023/07/27/us/pennsylvania-flooding-missing-child/index.html",
        "description": "The search for the 9-month-old who was swept away by floodwaters in southeast Pennsylvania has concluded after 12 days of searching, with no sign of the child, authorities said Wednesday.",
        "domain": "cnn.com",
        "favicon": "https://logo.clearbit.com/cnn.com",
        "img": "https://media.cnn.com/api/v1/images/stellar/prod/220215180557-sara-smart-profile.jpg?c=16x9&q=h_270,w_480,c_fill/c_thumb,g_face,w_100,h_100",
        "pageId": "f855e51dc832362f9cc8416263d4882147e230c021f0466eb46c00dda15b3494",
        "title": "Search ends for 9-month-old who went missing with his 2-year-old sister after they were swept away by floodwaters in Pennsylvania, police say | CNN"
      },
      {
        "canonicalUrl": "https://www.youtube.com",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "domain": "youtube.com",
        "img": "https://i.ytimg.com/vi/jfKfPfyJRdk/hq720_live.jpg?sqp=CPz1h6YG-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB3AJYtYCvx9wNWvTd-ROlGLgiBMg",
        "pageId": "d9331ac12870f29d2a892ff50663fe3027d723e07b31c99a46ff1d4a42939080",
        "title": "YouTube"
      },
      {
        "img": "https://media.licdn.com/dms/image/D4D05AQGP3s9Ys0_GPA/videocover-high/0/1690336971451?e=2147483647&v=beta&t=nu-RGFMz_b9S6dxiMD1FkqgV-u3Iof5-YnMjDKG51pU",
        "favicon": "https://logo.clearbit.com/linkedin.com",
        "canonicalUrl": "https://www.linkedin.com/posts/nandi-bishal_robots-roboticautomation-artificialintelligence-activity-7089787169900232704-NAhY",
        "clearbit": null,
        "description": "Impressive advancements in robotics have revolutionized the world of logistics and transformed the landscape of businesses 🔥 This cutting-edge innovation has… | 65 comments on LinkedIn",
        "title": "Bishal Nandi ↗️ on LinkedIn: #robots #roboticautomation #artificialintelligence | 65 comments",
        "pageId": "9b68c3f497feaddb9416bc64c51ea59fefa17c6b9f9121138fab5f708c192c57"
      },
      
];

export function Home() {
    const navigateTo = useNavigate();
    const [feedItems,] = useState(defaultFeed);
    // useEffect(() => {
    //     const fetchPages = async () => {
    //         const pages = await pageRepository.getAllPages();
    //         setFeedItems(pages);
    //     };

    //     fetchPages();
    // }, []);
    return (<>
        <Container fluid textAlign="center">
            <Header as="h2">Home</Header>
            <Label as='a' color='red' image className="feedLabel" onClick={() => navigateTo(getCommentsPagePath('https://www.cnn.com'))}>
                <img src='https://cnn.com/favicon.ico' alt="" />
                cnn.com
                <Label.Detail>News</Label.Detail>
            </Label>
            <Label as='a' color='blue' image className="feedLabel" onClick={() => navigateTo(getCommentsPagePath('https://www.foxnews.com'))}>
                <img src='https://foxnews.com/favicon.ico' alt="" />
                foxnews.com
                <Label.Detail>News</Label.Detail>
            </Label>
            <Label as='a' color='blue' image className="feedLabel" onClick={() => navigateTo(getCommentsPagePath('https://www.youtube.com'))}>
                <img src='https://youtube.com/favicon.ico' alt="" />
                Youtube.com
                <Label.Detail>Entertainment</Label.Detail>
            </Label>
            <Button size="mini">+ Add sites to follow (coming soon)</Button>
            <br />
            <a href={window.origin+"/#/comments?site=https://www.reddit.com"}>Click here to see the demo for the comments page to a webpage</a>
            <br/>
            <Feed feedItems={feedItems} />
        </Container>
    </>)
}