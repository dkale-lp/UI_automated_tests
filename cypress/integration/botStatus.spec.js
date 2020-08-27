require('cypress-xpath')
const process = require('process');
var intentsCSV = '../../Test-Data/intents';
var entitiesCSV = '../../Test-Data/entities';
var watsonCred = 'google_cred.txt'
var randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
var botName = "Automation_Bot_" + randomNumber;

var domainName = "Automation_Domain_" + randomNumber;
var credName = "Automation_Cred_" + randomNumber
describe('Bot Status', function() {
	it('Check bot status', function() {
		// login 
		cy.login();
        cy.viewport(1280, 720)
		cy.xpath("//h3[text()='Conversation Builder']").click()
		cy.waitForCBLoad()
		//create bot
		cy.get('[id="bna-create-bot"]').click()
		cy.wait(5000)
		cy.get('[id="bc-cb-bot-template-basics-Custom Bot"]').click({force:true})
		cy.get('[id="createbot_btn-save"]').click()
		cy.get('[name="name"]').type(botName)
		cy.xpath('//textarea[@name="description"]').type('Automation_Bot_Desc_Testing')
		cy.get('[id="createbot_btn-save"]').click()
		cy.waitForInteraction().its('status').should('eq', 200)
		cy.waitForConfig()
		cy.get('[title="Agent Connectors"]').click()
		cy.waitForAgentConnector().its('status').should('eq',200)
		cy.contains("Add Agent Connector").click()
		cy.get('[id="lpAccountId"]').type("55933744")
		cy.get('[class="btn btn-primary bc-next-arrow-cls"]').click()
		// cy.waitForAccountToLoad().its('status').should('eq',200)
		cy.contains("Select Agent User ID").click()
		cy.contains("CB-Agent").click()
		cy.get('[type="submit"]').click()
		cy.wait(30000)
		cy.xpath("//span[text()='Start']").click()
		cy.wait(30000)
		cy.xpath("//span[text()='Stop']").scrollIntoView().click()
		cy.contains("Yes").click()
		cy.wait(30000)
		cy.contains("stopped")
		cy.get('[class="datatable-body-row datatable-row-even ng-star-inserted"]').trigger('mouseover')
		cy.get('[class="bc-icon bc-icon-dotmenu"]').invoke('attr', 'style', 'visibility: visible').click()
		cy.contains("Delete").click()
		cy.contains("Yes").click()
		cy.agentDeleteWait()
		cy.get('[id="main-nav-sub-menu-toggle"]').click()
		cy.get('[id="additional_left-nav_menu_settings"]').click()
		cy.contains("More Settings").click()
		cy.get('[class="bc-icon bc-icon-delete"]').click()
		cy.contains("Proceed").click()
		cy.waitForAgentConnector()
	})
})