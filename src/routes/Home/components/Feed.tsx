import React from "react";
import { Grid } from "semantic-ui-react";
import FeedCard from "./FeedCard";
import { IPage } from "../../../DTO/Page/IPage";

type FeedProps = {
    feedItems: IPage[]
}

const Feed = ({ feedItems }: FeedProps) => {
  // Calculate the number of columns based on screen width
  const numColumns = Math.min(feedItems.length, 3);

  return (
    <Grid columns={numColumns as any} stackable doubling>
      {feedItems.map((item, index) => (
        <Grid.Column key={index}>
          <FeedCard {...item} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default Feed;
