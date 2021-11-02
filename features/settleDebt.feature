Feature: Settle Debt
    As a User
    I want to settle a debt

    Scenario: open settle debt pop-up
        Given I am logged in
        Given there are current debts
        When I click on "add Settle Debts"
        Then settle debt pop-up opens

    Scenario: Debt successfully settled by paying the total amount

        Given I am logged in
        Given there are current debts
        Given settle debt pop-up is open
        When I click on "add Settle Debts"
        And choose a date
        And add a Creditor
        And choose total amount payment
        And add payment method
        And click on "Send" button
        Then Creditor and I are notified about the payment

    Scenario: Debt successfully settled by adding a percentage payment

        Given I am logged in
        Given There are current debts
        Given settle debt pop-up is open
        When I click on "add Settle Debts"
        And choose a date
        And add a Creditor
        And choose a percentage payment
        And add reapeted settling of Debt
        And add payment method
        And click on "Send" button
        Then Creditor and I are notified about the payment

    Scenario: Repeating Settle Debt

        Given I am logged in
        Given There are current Debts
        Given settle Debt pop-up is open
        When I click on "add Settle Debts"
        And choose a Date
        And add a Creditor
        And choose a percentage payment
        And choose a reapeted settling Debt"
        And add an interval
        And add payment method
        And click on "Send" button
        Then Creditor and I are notified about the payment

    Scenario: cancel Settle Debt

        Given I am logged in
        Given There are current Debts
        Given settle Debt pop-up is open
        When I click on "Exit"
        Then settle debt pop-up closes

     

