import { Given, When, Then } from '@cucumber/cucumber'
import { By } from 'selenium-webdriver'
import { driver } from './step_defs.mjs'

Given("The user is not logged in", ()=>{
    return true
})

When("The user logs in", async (data)=>{
    const username = data.rawTable[1][0]
    const password = data.rawTable[1][1]

    const inputUsername = await driver.findElement(By.id("login-username-input"))
    await inputUsername.sendKeys(username)

    const inputPassword = await driver.findElement(By.id("login-password-input"))
    await inputPassword.sendKeys(password)

    const button = await driver.findElement(By.id("login-button"))
    await button.click()

    await driver.sleep(1000)
})

Then("The website will show an error message", ()=>{
    return "pending"
})