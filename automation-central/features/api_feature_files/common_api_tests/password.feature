
Feature: This Test is validate the registration with different types of data

    @ApiTests @password
    Scenario Outline: Test customer set password
        Given I populate registration details like "{{random_Email}}" "{{random_FirstName}}" "{{random_LastName}}" "Apitest@123" "{{property_currencyCode}}" "{{tsAndCs}}" "{{random_Username}}" "{{random_MobileNumber}}" "MR"
        Then I call the registration service
        Then verify the status code is "200"
        Then Verify the response time is less then "level1ResponseTime"
        Then I store token after registration
        Then I store account_id after registration
        Then check the registration response details
        Then activate the user in the custodian
        Then I call the API for create a customer set password
        Then check the customer set password response details

    Example:
            | email           | firstName           | lastName           | password    | currencyCode             | tsAndCs     | userName           | mobileNo               | title | kyc  | statusCode |
            | {{randomEmail}} | {{randomFirstName}} | {{randomLastName}} | Apitest@123 | {{property_currentCode}} | {{tsAndCs}} | {{randomUsername}} | {{randomModileNumber}} | "MR"  | true | 200        |


 @ApiTests @password
    Scenario Outline: Test the authentication with new password
        When I get user name and new password with "Global"
        Then I login with that user name and new pasword
        Then verify the status code is 200
        Then Verify the response time is less then "level1ResponseTime"
        Then check the authentication response details

    Example:
            | email           | firstName           | lastName           | password    | currencyCode             | tsAndCs     | userName           | mobileNo               | title | kyc  | statusCode |
            | {{randomEmail}} | {{randomFirstName}} | {{randomLastName}} | Apitest@123 | {{property_currentCode}} | {{tsAndCs}} | {{randomUsername}} | {{randomModileNumber}} | "MR"  | true | 200        |
