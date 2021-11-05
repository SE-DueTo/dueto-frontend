Feature: Login

    The user logs into the website

    Background:
        Given The website-url is "/login"

    Scenario: User logs in with correct login data
        Given The user is not logged in
        When The user logs in
            | username | password |
            | admin    | admin    |
        Then The website-url is now "/dashboard"

    Scenario: User logs in with wrong login data
        Given The user is not logged in
        When The user logs in
            | username | password |
            | admin    | nimda    |
        Then The website-url is now "/login"
        Then The website will show an error message