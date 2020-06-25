require('cypress-xpath')

var randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
describe('Bot Analytics', function() {
	before(function() {
		cy.login();
	})
	it('Create bot', function() {
		cy.xpath("//h3[text()='Conversation Builder']").click()

	})
	it('should verify Bot Analytics', function() {
		cy.xpath("//h3[text()='Bot Analytics']").click()
		cy.waitForDataAnalyticsToLoad(60000)
		cy.xpath('//*[@name="search"]').type("sdd{enter}")
		cy.xpath('//*[@title="sdd"]').click()
	});
})