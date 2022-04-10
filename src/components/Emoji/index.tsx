import React from 'react';
import { emojiData } from './data'; 
import styles from './index.module.scss';

interface EmojiProps {
  onChoose?: (emoji: string) => void;
}

const Emoji: React.FC<EmojiProps> = ({
  onChoose
}) => {

  const emojiArr = emojiData.split(',');

  const handleClick = (emoji: string) => {
    onChoose && onChoose(emoji);
  };

  return (
    <div className={styles['emoji']}>
      <ul className={styles['emoji-default']}>
        {
          emojiArr.map(item => (
            <li onClick={() => handleClick(item)} key={item}>{item}</li>
          ))
        }
      </ul>
      <div className={styles['emoji-tabs']}>
        <div className={styles['emoji-tab']}>
          { emojiArr[0] }
        </div>
      </div>
    </div>
  );
};

export default Emoji;