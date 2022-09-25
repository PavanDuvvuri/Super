
Feature: Get withdrawal

    @ApiTests @GetWithdrawal
    Scenario: Test the Get Withdrawal test
        Given I get user name and password with "Global"
        Then I login with that user name and pasword
        Then verify the status code is 200
        Then Verify the response time is less then "level1ResponseTime"
        Then check the authentication response details
        Then I store token after login
        Then I call the Get Withdrawal API
        Then verify the status code is 200
        Then Verify the response time is less then "level1ResponseTime"
        Then check the get Withdrawal response details