Feature: Test adding a transaction

    The user wants to add a transaction

    Scenario: open transaction pop-up
        Given The website-url is "/dashboard"
        And The tab "Transactions" is shown
        When The user clicks on "+ Transaction"
        Then Transaction pop-up opened

    Scenario: with distribute debts equally
        Given Transaction pop-up is open
        When The user chooses a date
        And The user adds an amount
        And The user adds an intended use
        And The user adds a Creditor
        And The user adds a payment method
        And The user clicks on "Save" button
        Then The transaction is added to List of transactions

    Scenario: with personalized Amount per Member
        Given Transaction pop-up is open
        When The user chooses a date
        And The user adds an amount
        And The user adds an intended use
        And The user adds a Creditor
        And The user adds a payment method
        And The user adds a amount per member
        And The user clicks on "Save" button
        Then THe transaction is added to List of transactions

    Scenario: with personalized percentage Amount per Member
        Given Transaction pop-up is open
        When The user chooses a date
        And The user adds an amount
        And The user adds an intended use
        And The user adds a Creditor
        And The user adds a payment method
        And The user adds a percentage amount per member
        And The user clicks on "Save" button
        Then The transaction added to List of transactions

    Scenario: with repeating settle debt
        Given Transaction pop-up is open
        When The user chooses a date
        And The user adds an amount
        And The user adds an intended use
        And The user adds a Creditor
        And The user adds a payment method
        And The user chooses repeating settle debt
        And The user adda an interval
        And The user clicks on "Save" button
        Then Transaction is added to List of transactions

    Scenario: cancel the adding prozess with button
        Given Transaction pop-up is open
        When The user clicks on "Exit"
        Then The transaction pop-up closes

    Scenario: cancel the adding prozess without button
        Given Transaction pop-up is open
        When The user clicks outsite of the pop-up
        Then The transaction pop-up closes