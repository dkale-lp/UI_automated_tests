const cypress = require('cypress')
const yargs = require('yargs')
const {
    merge
} = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')
const rm = require('rimraf')
const ls = require('ls')
const fs = require('fs');
const path = require('path');

const config = require('./cypress.json');
const argv = yargs.options({
        'browser': {
            alias: 'b',
            describe: 'choose browser that you wanna run tests on',
            default: 'chrome',
            choices: ['chrome', 'electron']
        },
        'spec': {
            alias: 's',
            describe: 'run test with specific spec file',
            default: 'cypress/integration/*.js'
        },
        'headless': {
            alias: 'h',
            describe: 'headless browser or not',
            default: false
        },
        'configFile': {
            alias: 'c',
            describe: 'path to config file',
            default: 'cypress.json'
        }
    }).help()
    .argv

var filename = process.cwd() + '/cypress/report/mochawesome-report/mochawesome.html'
var directoryPath = process.cwd() + '/cypress/report/mochawesome-report/assets/'
const fileList = [];
const reportDir = config.reporterOptions.reportDir
const reportFiles = `${reportDir}/*.json`

// list all of existing report files
ls(reportFiles, {
    recurse: true
}, file => console.log(`removing ${file.full}`))

// delete all existing report files
rm(reportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`)
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
})

 cypress.run({
    configFile: argv.configFile,
    browser: argv.browser,
    spec: argv.spec,
    headless: argv.headless,
}).then(async (results) => {
    const reporterOptions = {
        reportDir: reportDir,
        inline: config.reporterOptions.inline,
    }
    await generateReport(reporterOptions)

}).catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
})


function generateReport(options) {
    return merge(options).then((report) =>
        marge.create(report, options)
    )
}

const options = {
    destination:  '/mochawesome.html',
};