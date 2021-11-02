Feature: Login

    The user logs into the website

    Background:
        Given the browser loads
        And the website is "/login"

    Scenario: User logs in with correct login data
        And The user is not logged in
            | username | password | dashboard_url |
            | admin    | admin    | /dashboard    |
        When the user types <username> into the username input field
        And the user types <password> into the password input field
        And The user clicks the login button
        Then The website will redirect to <dashboard_url>

    Scenario: User logs in with wrong login data
        And The user is not logged in
            | username | password |
            | admin    | nimda    |
        When the user types <username> into the username input field
        And the user types <password> into the password input field
        And The user clicks the login button
        Then The website will show an error message