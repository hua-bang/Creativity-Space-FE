import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { Button, Empty, Message } from "@arco-design/web-react";
import { getPointById } from "@/api/point";
import { Point } from "@/typings/point";
import PointModal from "../Point-Modal";

interface ChatArticleProps {
  pointId: string;
}

const ChatArticle: React.FC<ChatArticleProps> = ({
  pointId,
}) => {

  const [point, setPoint] = useState<Point>();

  const loadArticle = (pointId: string) => {
    getPointById(pointId).then(res => {
      setPoint(res.data);
    }).catch(err => console.warn);
  };

  useEffect(() => {
    loadArticle(pointId);
  }, [pointId]);

  const toDetail = () => {
    window.open(`/point/${pointId}`);
  };

  return (
    <div onClick={toDetail}>
      <div className={styles['chat-point-wrapper']}>
        { 
          point ? (
            <PointModal point={point} />
          ) : (
            <Empty
              imgSrc='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
              description={<Button type='primary'>无动态信息</Button>}
            />
          )
        }
      </div>
    </div>
    
  );
};

export default ChatArticle;