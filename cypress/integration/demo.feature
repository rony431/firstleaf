Feature: Testing firstLeaf
  Scenario: Verify ui complete quiz
    Given Test on firstleaf login page
    When Enter the sweet wine
    When Coffee or tea selection
    When Select wine type
    When Select how much variation
    When Select your wine preferences
    When Select wine type
    When Select wine taste
    When Select wine flavors
    When Select number of bottles
    Then Reveal your quiz results
    Then Go to complete checkout
    Then Fill up form
    Then validate second step

  Scenario: Verify All countries API
    Given I validate the country endpoint
    Then I validate wrong url