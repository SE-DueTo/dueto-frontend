Feature: Settle Debt

    The user wants to settle a debt

    Scenario: open settle debt pop-up
        Given The user is logged in
        Given There are current debts
        When The user clicks on "add Settle Debts"
        Then Settle debt pop-up opens

    Scenario: Debt successfully settled by paying the total amount

        Given The user is logged in
        Given There are current debts
        Given The settle debt pop-up is open
        When The user clicks on "add Settle Debts"
        And The user chooses a date
        And The user adds a Creditor
        And The user chooses total amount payment
        And The user adds a payment method
        And The user clicks on "Send" button
        Then The user and Creditor are notified about the payment

    Scenario: Debt successfully settled by adding a percentage payment

        Given The user is logged in
        Given There are current debts
        Given The settle debt pop-up is open
        When The user clicks on "add Settle Debts"
        And The user chooses a date
        And The user adds a Creditor
        And The user chooses a percentage payment
        And The user adds reapeted settling of Debt
        And The user adds a payment method
        And The user clicks on "Send" button
        Then The user and Creditor are notified about the payment

    Scenario: Repeating Settle Debt

        Given THe use is logged in
        Given There are current debts
        Given The settle debt pop-up is open
        When The user clicks on "add Settle Debts"
        And The user chooses a Date
        And The user adds a Creditor
        And The user chooses a percentage payment
        And The user adds reapeted settling of Debt
        And The user adds an interval
        And The user adds a payment method
        And The user clicks on "Send" button
        Then The user and Creditor are notified about the payment

    Scenario: cancel Settle Debt

        Given The user is logged in
        Given There are current debts
        Given The settle debt pop-up is open
        When The user clicks on "Exit"
        Then The settle debt pop-up closes

     

