
Feature: This Test is validate the registration with different types of data

    @ApiTests @registration
    Scenario Outline: Test the Get Customer details test
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then check the registration response details