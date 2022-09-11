module.exports = {
  rootTranslationsPath: 'assets/i18n/',
  langs: ['en', 'pl', 'fr'],
  keysManager: {
    fileFormat: 'json',
    sort: true,
    addMissingKeys: false, // does not seem to work
    emitErrorOnExtraKeys: true,
    replace: false,
  },
};
