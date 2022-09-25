
Feature: This Test is demo feature which tests the get customer details

  @ApiTests1 @GetCustomerDetails
  Scenario: Test the Get Customer details test
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer API
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer response details