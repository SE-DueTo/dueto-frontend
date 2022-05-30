/**
 * Selenium Doku:
 * https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index.html
 * 
 * Cucumber-js Doku:
 * https://github.com/cucumber/cucumber-js
 */

import { Given, Then, After, Before, BeforeAll } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import { By, Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/edge.js'
import dotenv from 'dotenv'

let edgeOptions = new Options();

const rootURL = "http://localhost:3000";
export const loginUrl = `${rootURL}/login/`
export let driver;

BeforeAll(()=>{
    dotenv.config()
    console.log(process.env)
})

Before(async ()=>{
    driver = await new Builder()
        .setEdgeOptions(edgeOptions)
        .forBrowser('MicrosoftEdge')
        .build();
})

Given("The website-url is {string}", async (url) => {
    return driver.get(rootURL + url)
})

Then("The website-url is now {string}", async (url) => {
    const currentUrl = await driver.getCurrentUrl()
    assert.equal(currentUrl, `${rootURL}${url}`)
})

Given("The user is logged in", async ()=>{
    await driver.get(rootURL + "/login")
    const username = process.env.CUCUMBER_USERNAME
    const password = process.env.CUCUMBER_PASSWORD

    if(!username || !password) {
        throw new Error("Username or password not given")
    }

    await login(username, password)
})

After(async ()=>{
    await driver.quit()
})

async function login(username, password) {
    const inputUsername = await driver.findElement(By.id("login-username-input"))
    await inputUsername.sendKeys(username)

    const inputPassword = await driver.findElement(By.id("login-password-input"))
    await inputPassword.sendKeys(password)

    const button = await driver.findElement(By.id("login-button"))
    await button.click()

    await driver.sleep(1000)

    const currentUrl = await driver.getCurrentUrl()
    assert.equal(currentUrl, `${rootURL}/dashboard`)
}