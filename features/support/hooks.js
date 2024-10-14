const {After, AfterAll, BeforeAll, Status} = require('@cucumber/cucumber')
const Report = require('./report')

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshot = await this.driver.takeScreenshot()
        this.attach(screenshot, { mediaType: 'base64:image/png' })
      }

    if (this.driver) {
        this.driver.quit()
    }
})

AfterAll(async function () {
   setTimeout(() => {
    Report.generate();
    }, 1000)
})