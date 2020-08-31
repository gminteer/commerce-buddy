module.exports = {
  env: {
    node: true,
    es2017: true,
  },
  plugins: ['prettier', 'promise', 'import', 'node', 'security'],
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'google',
    'prettier',
    'plugin:node/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    'prettier/prettier': ['warn'],
    'no-template-curly-in-string': ['error'],
    'prefer-template': ['warn'],
    'require-jsdoc': ['off'],
    'new-cap': ['warn', {capIsNewExceptions: ['Router']}],
    'no-debugger': ['warn'],
    'vars-on-top': ['warn'],
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    eqeqeq: ['error', 'always'],
    curly: ['error', 'multi-or-nest', 'consistent'],
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
};
