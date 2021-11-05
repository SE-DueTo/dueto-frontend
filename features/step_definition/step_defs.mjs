/**
 * Selenium Doku:
 * https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index.html
 * 
 * Cucumber-js Doku:
 * https://github.com/cucumber/cucumber-js
 */

import { Given, When, Then, After, Before } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/edge.js'

let edgeOptions = new Options();

const rootURL = "http://localhost:3000";
export const loginUrl = `${rootURL}/login/`
export let driver;

Before(async ()=>{
    driver = await new Builder()
        .setEdgeOptions(edgeOptions)
        .forBrowser('MicrosoftEdge')
        .build();
})

Given("The website-url is {string}", async (url) => {
    return await driver.get(rootURL + url)
})

Then("The website-url is now {string}", async (url) => {
    const currentUrl = await driver.getCurrentUrl()
    assert.equal(currentUrl, `${rootURL}${url}`)
})

After(async ()=>{
    await driver.quit()
})