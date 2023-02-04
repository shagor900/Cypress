const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "watchForFileChanges": false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Buy Social',
    embeddedScreenshots: true,
    inlineAssets: true,
    html: true,
    json: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
