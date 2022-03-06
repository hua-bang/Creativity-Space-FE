import React from 'react';
import useSearchParamByKey from '../../hooks/useSearchParamByKey';

const searchKeyWordName = 'q';

const Search = () => {
  
  const keyWord = useSearchParamByKey(searchKeyWordName);

  console.log(keyWord);

  return (
    <div>
      search
    </div>
  );
};

export default Search;