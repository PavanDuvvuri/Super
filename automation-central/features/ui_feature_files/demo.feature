@Application=Jennings
Feature: Demo Test of Login Jenning

@Priority
Scenario: Home screen validation scenarios
Then I can validate visibility of element on webpage
    | "//*[text()='SPORTS']"   | 
    | "//*[text()='VIRTUALS']"  | 
    | "//*[text()='CASINO']"     | 

When I click on "loginbutton" login button within "loginheader" Authorization App Section
When I type "abc" into "login.usernametextbox" into username textbox
When I type "def" into "login.passwordtextbox" into username textbox

When I click on "login.loginbutton" Login button
Then I can validate "login.invalidcredentialerror" is present on webpage