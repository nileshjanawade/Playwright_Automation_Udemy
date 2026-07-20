Feature: Ecommerce validations
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "neel.janawade9@yopmail.com" and "Neel@3694"
        When Add "ADIDAS ORIGINAL" to cart
        Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
        When Start to type your When step here Enter valid details and Place the order
        Then Verify order in present in the OrderHistory