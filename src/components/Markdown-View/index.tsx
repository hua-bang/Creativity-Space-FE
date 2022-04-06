import React from 'react';
import { Viewer, ViewerProps } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const defaultPlugins = [
  gfm(),
  highlight()
];

const MarkdownView: React.FC<ViewerProps> = ({
  plugins: customPlugins = [],
  ...rest
}) => {
  
  const plugins = [
    ...defaultPlugins,
    ...customPlugins
  ];
  
  return (
    <Viewer plugins={plugins} {...rest} />
  );
};

export default MarkdownView;