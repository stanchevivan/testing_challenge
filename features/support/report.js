var reporter = require('cucumber-html-reporter');
// const environment = require('./environment');
const browser = require('./world');

class Report {
    static generate() {
        var options = {
            theme: 'bootstrap',
            jsonFile: 'report/cucumber_report.json',
            output: 'report/cucumber_report.html',
            screenShotDirectory: 'report/screenshots',
            storeScreenshots: true,
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata: {
                "App Version":"1.0.0",
                "Test Environment": "environment",
                "Browser": browser,
                "Platform": process.platform,
            },
            failedSummaryReport: true,
        };

    reporter.generate(options);
    }
}

module.exports = Report;