import React from 'react';
import { Radio } from '@arco-design/web-react';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface NavGroupProps {
  menuList: string[];
  defaultValue?: string;
}

const NavGroup = ({
  menuList,
  defaultValue = menuList[0] || ''
} : NavGroupProps) => {
  return (
    <div>
      <Radio.Group defaultValue={defaultValue}>
        {
          menuList.map((item) => {
            return (
              <Radio key={item} value={item}>
                {({ checked }: { checked: boolean }) => {
                  return (
                    <span className={classnames(styles['nav-item'], checked ? styles['active'] : '') }>
                      {item}
                    </span>
                  );
                }}
              </Radio>
            );
          })
        }
      </Radio.Group>
    </div>
  );
};

export default NavGroup;