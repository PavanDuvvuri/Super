
Feature: This is used to test the validate username request

  @ApiTests @ValidateUsername
  Scenario: Test the validate username test
     
    Given I call the Get Validate Username API
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the validate Username response details