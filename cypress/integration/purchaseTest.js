
describe('Testing the purchase process', () => {
    it('Opens the app and adds two items to cart', () => {
        //Load the App
      cy.visit('http://localhost:9000/')
      //Get the first item and add to cart
      cy.get(".MuiGrid-item")
      .contains(".popupClickArea", "JARLSBERG")
      .siblings()
      .contains("Add to cart").click()

      //Get the second item and add to cart
      cy.get(".MuiGrid-item")
      .contains(".popupClickArea", "MAASDAM")
      .siblings()
      .contains("Add to cart").click()
    })

    it("Opens the shopping cart and does checkout if there are items in the cart", () =>{
        //Open the cart
        cy.get("button")
        .contains("button", "Cart").click()
        //checkout cart items
        cy.get(".MuiDrawer-paper")
        .contains("button", "Purchase").click()
    })
  })