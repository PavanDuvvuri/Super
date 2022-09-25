module.exports = {
  default: {
    parallel: 1,
    publishQuiet: true,
    path: ['features/api_feature_files/goat/*', 'features/api_feature_files/common_api_tests/*'],
    format: ['progress-bar', 'json:cucumber-report.json', 'html:cucumber-report.html'],
    require: ['step-definition/api-steps/*.js']
  }
}