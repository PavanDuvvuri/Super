
Feature: This Test is validate the deposit limit with different types of data

    @ApiTests @deposit_limit_daily @deposit_limits
    Scenario Outline: Test the Get Customer details test
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then I store token after registration
        Then I store account_id after registration
        Then check the registration response details
        Then activate the user in the custodian
        And I call the Get deposit limit details
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then check the deposit limit response details

    @ApiTests @deposit_limit_weekly @deposit_limits
    Scenario Outline: Test the Get Customer details test
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then I store token after registration
        Then I store account_id after registration
        Then check the registration response details


    @ApiTests @deposit_limit_monthly @deposit_limits
    Scenario Outline: Test the Get Customer details test
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then check the registration response details