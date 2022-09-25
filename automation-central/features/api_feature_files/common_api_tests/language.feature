Feature:This Test is used to tests Language Controller details

@ApiTests @LanguageController
  Scenario: Test the self Language English
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the put English Language API 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the put English Language response details

    @ApiTests @LanguageController
  Scenario: Test the self Language French
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the put French Language API 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the put French Language response details