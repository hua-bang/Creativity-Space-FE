import { Radio } from '@arco-design/web-react';
import React, { useState } from 'react';
import ArticleList from '../../../ArticleList';
import BookletList from '../../../BookletList';
import PointList from '../../../PointList';


const RadioGroup = Radio.Group;

const menus = {
  article: {
    title: '文章',
    component: ArticleList 
  },
  point: {
    title: '动态',
    component: PointList
  },
  booklet: {
    title: '小册',
    component: BookletList
  }
};

type MenuKey = keyof typeof menus;

const ToAudit = () => {

  const [val, setVal] = useState('article');

  const handleChange = (val: string) => {
    setVal(val);
  };

  const RenderComponent = menus[val as MenuKey].component;

  return (
    <div>
      <h2>未审核列表</h2>
      <div>
        类别：
        <RadioGroup value={val} onChange={handleChange} style={{ marginBottom: 20 }}>
          {
            Object.keys(menus).map(key => (
              <Radio key={key} value={key}>{menus[key as MenuKey].title}</Radio>   
            ))
          }
        </RadioGroup>
        <RenderComponent showTitle={false} searchParams={{ status: 0 }} />
      </div>
    </div>
  );
};

export default ToAudit;