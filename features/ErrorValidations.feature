Feature: Ecommerce validations
  @foo
  Scenario: Placing the Order
    Given a login to Ecommerce2 application with "neel.janawade978@yopmail.com" and "Neel@3694"
    Then verify Error  message is displayed


  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then verify Error  message is displayed

    Examples:
      | username                    | password  |
      | neel.janawade12@yopmail.com | Neel@3694 |
      | neel.janawade7@yopmail.com  | Neel@3694 |