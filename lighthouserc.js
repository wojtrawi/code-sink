module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/code-sink',
      url: ['http://localhost:4200'],
      isSinglePageApplication: true,
      numberOfRuns: 3,
      puppeteerScript: 'init-browser.js',
      settings: {
        disableStorageReset: false,
      },
    },
    assert: {
      // preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
