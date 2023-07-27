import React from "react";
import { Card, Image } from "semantic-ui-react";
import { IPage } from '../../../DTO/Page/IPage';
import { useNavigate } from "react-router-dom";
import { getCommentsPagePath } from "../../../shared/Pages";

const FeedCard = (props:IPage) => {
    const navigateTo = useNavigate();
  return (
    <Card fluid>
      {props.img && <Image src={props.img} alt={props.title} wrapped ui={false} />}
      <Card.Content>
        <Card.Header onClick={()=>{navigateTo(getCommentsPagePath(props.canonicalUrl))}} style={{cursor:'pointer'}}>{props.title}</Card.Header>
        <Card.Meta>
          <a href={props.canonicalUrl}>{props.canonicalUrl}</a>
        </Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FeedCard;
