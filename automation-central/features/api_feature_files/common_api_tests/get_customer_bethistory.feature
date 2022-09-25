Feature:This Test is used to tests the customer bet history 

@ApiTests @customerbethistory
  Scenario: Test the customer bet history with mandatory fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer bet history API with mandatory fields
      Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer bet history with mandatory field response details

@ApiTests @customerbethistory
  Scenario: Test the customer unsettled bet history with all fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer unsettled bet history API with all fields
      Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer unsettled bet history with all field response details

@ApiTests @customerbethistory
  Scenario: Test the customer settled bet history with all fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer settled bet history API with all fields
      Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer settled bet history with all field response details


@ApiTests @customerbethistory
  Scenario: Test the customer  bet history without accesstoken 
    Given I call the Get customer bet history API without accesstoken
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer bet history without accesstoken

