Feature:This Test is used to tests Journal details

@ApiTests @Journal
  Scenario: Test the Journal Details without limit
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Journal API without limit
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get Journal without limit response details

     @ApiTests @Journal
  Scenario: Test the Journal Details with limit
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Journal API with limit
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get Journal with limit response details