
Feature: This Test is used to tests the Card details positive flow

  @ApiTests  @Cards
  Scenario: Test the card details with All Fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get cards API with all fields
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get cards response details

  @ApiTests @Cards
  Scenario: Test the card details with Mandatory Fields
    Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Get cards API with mandatory fields
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get cards response details 

  @ApiTests @Cards
  Scenario: Test the card details without access token
    Given I call the Get cards API without accesstoken
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get cards without accesstoken 

  @ApiTests @Cards
  Scenario: Test the delete card details with Mandatory Fields
   Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Delete cards API 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the delete cards response details 

  @ApiTests @Cards
  Scenario: Test the activate card details with Mandatory Fields
   Given I get user name and password with "Global"
    Then I login with that user name and pasword 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the authentication response details
    Then I store token after login
    Then I call the Activate card API 
    Then verify the status code is 200
    Then Verify the response time is less then "level1ResponseTime"
    Then check the activate cards response details 


  @ApiTests @Cards
  Scenario: Test the deactivate card details with invalid card id
    Given I call the deactivate card API with invalid card id
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the deactivate card with invalid card response details 

  @ApiTests @Cards
  Scenario: Test the deactivate card details without access token
    Given I call the deactivate card API without access token
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get cards without accesstoken 

  @ApiTests @Cards
  Scenario: Test the activate card details without access token
    Given I call the activate card API without access token
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the get cards without accesstoken 

  @ApiTests @Cards
  Scenario: Test the activate card details with invalid card id
    Given I call the activate card API with invalid card id
    Then verify the status code is 500
    Then Verify the response time is less then "level1ResponseTime"
    Then check the cards response with invalid card id 