module.exports = {
  displayName: 'blog-ai-ui',
  preset: '../../jest.preset.js',
  transform: {
    '^.+.vue$': '@vue/vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/blog-ai-ui',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'apps/blog-ai-ui/tsconfig.spec.json',
    },
    'vue-jest': {
      tsConfig: 'apps/blog-ai-ui/tsconfig.spec.json',
    },
  },
};
