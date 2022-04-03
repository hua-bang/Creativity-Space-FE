export const isFunction = (value: any) => {
  return typeof value === 'function' && value !== null;
};

export const toAnchor = (tag: string) => {
  const anchorElement = document.querySelector(tag);
  if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
};