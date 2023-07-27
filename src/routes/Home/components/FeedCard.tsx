import React from "react";
import { Card, Image } from "semantic-ui-react";
import { IPage } from '../../../DTO/Page/IPage';

const FeedCard = (props:IPage) => {
  return (
    <Card fluid>
      {props.img && <Image src={props.img} alt={props.title} wrapped ui={false} />}
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>
          <a href={props.canonicalUrl}>{props.canonicalUrl}</a>
        </Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FeedCard;
