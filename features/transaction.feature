Feature: Test adding a transaction
    As a user
    I want adding a transaction

    Scenario: open transaction pop-up
        Given the website-url is "/dashboard"
        And on tab "Transactions"
        When I click on "+ Transaction"
        Then Transaction pop-up opened

    Scenario: with distribute debts equally
        Given transaction pop-up is open
        When I choose a date
        And add amount
        And add intended use
        And add Creditor
        And add payment method
        And click on "Save"
        Then transaction added to List of transactions

    Scenario: with personalized Amount per Member
        Given transaction pop-up is open
        When I choose a date
        And add amount
        And add intended use
        And add Creditor
        And add payment method
        And add amount per member
        And click on "Save"
        Then Transaction added to List of Transactions

    Scenario: with personalized percentage Amount per Member
        Given transaction pop-up is open
        When I choose a date
        And add amount
        And add intended use
        And add Creditor
        And add payment method
        And add percentage amount per member
        And click on "Save"
        Then Transaction added to List of Transactions

    Scenario: with repeating settle debt
        Given transaction pop-up is open
        When I choose a date
        And add amount
        And add intended use
        And add Creditor
        And add payment method
        And choose repeating settle debt
        And add interval
        And click on "Save"
        Then Transaction added to List of Transactions

    Scenario: cancel the adding prozess with button
        Given transaction pop-up is open
        When I click on "Exit"
        Then transactionpop-up close
        And transaction will not be saved

    Scenario: cancel the adding prozess without button
        Given transaction pop-up is open
        When I click outsite of the pop-up
        Then transactionpop-up close
        And transaction will not be saved





