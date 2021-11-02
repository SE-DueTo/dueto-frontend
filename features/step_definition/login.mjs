import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'
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
    
    await inputPassword.sendKeys("\n")
})

Then("The website will show an error message", ()=>{
    return "pending"
})