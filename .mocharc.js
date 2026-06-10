module.exports = {
  require: ["tests/hooks.js"],
  spec: ["tests/e2e/**/*.spec.js"],
  timeout: 60000,
  reporter: "mochawesome",
  reporterOption: [
    "reportDir=reports",
    "reportFilename=mochawesome",
    "quiet=true",
    "overwrite=true",
    "html=true",
    "json=true"
  ]
};
