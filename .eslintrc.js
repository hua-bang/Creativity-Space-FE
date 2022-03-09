module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'indent': [2, 2],
    'quotes': [1, 'single'],
    'semi': [2, 'always'],
    'no-empty': 2,
    'eqeqeq': 2,
    'max-depth': [0, 4],
    'max-len': [1, 120],
    '@typescript-eslint/no-var-requires': 'off'
  }
};