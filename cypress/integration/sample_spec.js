describe("My First Test", function() {
    it("Visits the Kitchen Sink", function() {
      cy.visit("/../../index.html");

      cy.get("#drop1").select("1");
    });
  });