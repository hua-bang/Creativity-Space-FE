import { Booklet } from '@/typings/booklet';
import React from 'react';
import MarkdownView from '@/components/Markdown-View';

interface BookletIntroduceProps {
  booklet: Booklet;
}

const BookletIntroduce: React.FC<BookletIntroduceProps> = ({
  booklet
}) => {
  return (
    <div style={{ padding: '30px' }}>
      <MarkdownView  value={booklet.introduce}/>
    </div>
  );
};

export default BookletIntroduce;