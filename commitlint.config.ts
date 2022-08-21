import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: [' CS-', '#'],
    },
  },
  rules: {
    'scope-empty': [2, 'never'],
    'references-empty': [2, 'never'],
  },
};

module.exports = Configuration;
