declare namespace IndexModuleScssNamespace {
  export interface IIndexModuleScss {
    'creativity-header__container': string;
    [key: string]: string;
  }
}

declare const IndexModuleScssModule: IndexModuleScssNamespace.IIndexModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexModuleScssNamespace.IIndexModuleScss
};

export = IndexModuleScssModule;