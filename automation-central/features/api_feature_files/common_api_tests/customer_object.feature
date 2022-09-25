Feature:This Test is used to tests the customer object(get customer) details

@ApiTests @CustomerObject
  Scenario: Test the customer  object(get customer) with mandatory fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer object API with mandatory fields
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer object with mandatory field response details

   @ApiTests @CustomerObject
  Scenario: Test the customer  object(get customer) with all fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get Customer object API with all fields
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer object with all field response details 

     @ApiTests @CustomerObject
  Scenario: Test the customer object(get customer) without accesstoken
    Given I call the Get customer object API without accesstoken
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get customer object without accesstoken