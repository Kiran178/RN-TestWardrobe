const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: 'http://localhost:9001',
    login: 'admin',
    password: 'admin',
    options: {
      'sonar.sources': './src',
      'sonar.tests': './src',
      'sonar.test.inclusions': '**/*.test.js',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.coverage.exclusion': './src/navigation/*.js',
    },
  },
  () => process.exit(),
);
