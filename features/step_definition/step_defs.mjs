import { Given, When, Then, After, Before } from '@cucumber/cucumber'
import { strict as assert } from 'assert'
import webdriver, { Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/edge.js'

let edgeOptions = new Options();

const rootURL = "http://localhost:3000";
let driver;

Before(async ()=>{
    driver = await new Builder()
        .setEdgeOptions(edgeOptions)
        .forBrowser('MicrosoftEdge')
        .build();
})

Given("the website is {string}", async (url) => {
    return await driver.get(rootURL + url)
})

After(async ()=>{
    await driver.quit()
})