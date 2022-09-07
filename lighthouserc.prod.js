module.exports = {
  ci: {
    collect: {
      url: ['https://wojtrawi.github.io/code-sink/'],
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
      target: {
        target: 'lhci',
        serverBaseUrl: 'https://cryptic-tundra-19411.herokuapp.com/',
        token: 'b64efc14-b6ff-43e8-b015-038ca94d5a5c',
      },
    },
  },
};
