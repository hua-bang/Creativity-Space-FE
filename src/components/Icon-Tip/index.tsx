import React, { CSSProperties, ReactElement } from 'react';
import styles from './index.module.scss';

interface IconTipProps {
  icon: ReactElement;
  text?: string | ReactElement;
  onClick?: () => void;
  style?: CSSProperties;
  size?: string;
  color?: string;
  spacing?: string;
  fontStyle?: CSSProperties;
  fontSize?: string;
}

const IconTip: React.FC<IconTipProps> = ({
  icon,
  text = '',
  onClick,
  style = {},
  size = '16px',
  color = '#4e5969',
  spacing = '3px',
  fontStyle= {},
  fontSize = '14px'
}) => {
  const iconTipStyle: CSSProperties = {
    ...style,
    fontSize: size,
    color,
  };

  const textStyle: CSSProperties = {
    ...fontStyle,
    fontSize
  };
  return (
    <div className={styles['icon-tip']} onClick={onClick} style={iconTipStyle}>
      <span style={{ paddingRight: spacing }}>
        {icon}
      </span>
      <span className={styles['icon-text']} style={textStyle}>{text}</span>
    </div>
  );
};

export default IconTip;