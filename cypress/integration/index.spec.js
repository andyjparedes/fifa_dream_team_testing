beforeEach(function () {
  cy.visit("/../../index.html");
});

describe("Can not advance with incorrect inputs", function() {
  beforeEach(function () {
    cy.visit("/../../index.html");
  });

  it("Can not advance with no user input", function() {
    cy.get("#draftpage").click();
  });
  it("Can not advance with null input for number of players", function() {
    cy.get("#drop2").select("18");
    cy.get("#draftpage").click();
  });
  it("Can not advance with null input for number of teams", function() {
    cy.get("#drop1").select("1");
    cy.get("#draftpage").click();
  });
  it("Can not advance with lead space in team names", function() {
    cy.get("#drop1").select("1");
    cy.get("#teamnames").get("#team1").type(" Team1");
    cy.get("#draftpage").click();
  });
  it("Can not advance with ending space in team names", function() {
    cy.get("#drop1").select("1");
    cy.get("#teamnames").get("#team1").type("Team1 ");
    cy.get("#draftpage").click();
  });
  it("Can not advance with back-to-back spaces in team names", function() {
    cy.get("#drop1").select("1");
    cy.get("#teamnames").get("#team1").type("Team  1");
    cy.get("#draftpage").click();
  });
  it("Can advance with a space in team names", function() {
    cy.get("#drop1").select("1");
    cy.get("#teamnames").get("#team1").type("Team 1");
    cy.get("#drop2").select("18");
    cy.get("#draftpage").click();
    cy.contains("currently drafting");
  });
});

describe("Confirm data is being stored correctly", function() {
    beforeEach(function () {
      cy.visit("/../../index.html");
    });  

    it("Displays correct number of team input slots", function() {
      cy.get("#drop1").select("1");
      cy.get("#teamnames").get("#team1");

      cy.get("#drop1").select("2");
      cy.get("#teamnames").get("#team1");
      cy.get("#teamnames").get("#team2");

      cy.get("#drop1").select("3");
      cy.get("#teamnames").get("#team1");
      cy.get("#teamnames").get("#team2");
      cy.get("#teamnames").get("#team3");

      cy.get("#drop1").select("4");
      cy.get("#teamnames").get("#team1");
      cy.get("#teamnames").get("#team2");
      cy.get("#teamnames").get("#team3");
      cy.get("#teamnames").get("#team4");

      cy.get("#drop1").select("5");
      cy.get("#teamnames").get("#team1");
      cy.get("#teamnames").get("#team2");
      cy.get("#teamnames").get("#team3");
      cy.get("#teamnames").get("#team4");
      cy.get("#teamnames").get("#team5");

      cy.get("#drop1").select("6");
      cy.get("#teamnames").get("#team1");
      cy.get("#teamnames").get("#team2");
      cy.get("#teamnames").get("#team3");
      cy.get("#teamnames").get("#team4");
      cy.get("#teamnames").get("#team5");
      cy.get("#teamnames").get("#team6");
    });
    it("Data correctly matches user input for all fields", function() {
      cy.get("#drop1").select("4");
      cy.get("#drop1").should("have.value", "4");
      cy.get("#drop2").select("18");
      cy.get("#drop2").should("have.value", "18");
      cy.get("#drop3").select("Manually");
      cy.get("#drop3").should("have.value", "drop3manually");
      cy.get("#drop4").select("Repeating");
      cy.get("#drop4").should("have.value", "repeating");
      cy.get("#drop4").select("Snake");
      cy.get("#drop4").should("have.value", "snake");
      cy.get("#drop5").select("FIFA 19");
      cy.get("#drop5").should("have.value", "fifa19");
    });
  });

describe("Check corner cases", function() {
  beforeEach(function () {
    cy.visit("/../../index.html");
  });  
  
  it("Max length of team names is 30", function() {
    cy.get("#drop1").select("3");
    cy.get("#teamnames").get("#team1").type("aaaaaaaaaabbbbbbbbbbccccccccccdddddddddd");
    cy.get("#teamnames").get("#team1").should("have.value", "aaaaaaaaaabbbbbbbbbbcccccccccc");
  });
  it("Number of team name inputs should change when number of teams changes", function() {
    cy.get("#drop1").select("6");
    cy.get("#teamnames").get("#team6");
    cy.get("#drop1").select("1");
    cy.get("#teamnames").get("#team6").should("not.exist");
  })
});