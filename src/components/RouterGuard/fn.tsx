import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

export function lazyLoad(importFn: any, meta: any) {
  const Element = lazy(importFn);
  const lazyElement = (
    <Suspense fallback={<div></div>}>
      <Element _meta={meta}/>
    </Suspense>
  );
}