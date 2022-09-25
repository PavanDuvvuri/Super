
Feature: This is used to test the validate email request

  @ApiTests @ValidateEmail
  Scenario: Test the validate email test
     
    Given I call the Get Validate Email API
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the validate email response details