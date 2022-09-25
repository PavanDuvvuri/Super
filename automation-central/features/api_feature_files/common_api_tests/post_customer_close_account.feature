
Feature: Post customer close account

    @ApiTests @PostCustomerCloseAccount
    Scenario: Test the Post Customer Close Account test
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then I store token after registration
        Then check the registration response details
        Then I call the Post Customer Close Account API
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then check the Post Customer Close Account response details
