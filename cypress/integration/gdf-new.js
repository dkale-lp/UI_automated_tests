require('cypress-xpath')
const process = require('process');
var intentsCSV = '../../Test-Data/intents';
var entitiesCSV = '../../Test-Data/entities';
var watsonCred = 'google_cred.txt'

var randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
var domainName = "Automation_Domain_" + randomNumber;
var credName = "Automation_Cred_" + randomNumber
describe('GDF check', function() {
	it('Create bot - check matched and unmatched intents', function() {
		// login 
		cy.login();
		cy.xpath("//h3[text()='Intent Builder']").click()
		cy.waitForIntentBuilderHP()
		cy.xpath('//a//span[text()="Add Domain"]').click()
		cy.wait(1000)
		cy.get('[id="domain-form_input-field-name-label"]').type(domainName)
		cy.get('[id="domain-form_radio-field-import"]').click()
		cy.get('[id="domain-form_radio-field-csv"]').click()
		cy.get('[id="domain-form_input-intent-csv-file"]').attachFile(intentsCSV)
		cy.get('[id="domain-form_input-entities-CSVFile"]').attachFile(entitiesCSV)
		cy.get('[id="domain-form-input-vendor-type"]').click()
		cy.xpath('//span[@class="mat-option-text" and contains(text(),"Google Dialog Flow")]').click()
		cy.get('[id="domain-form_input-submit"]').click()
		cy.xpath("//*[text()='I agree']").click()
		//cy.get('[class="btn btn-primary"]').click()
		cy.createDomainWait().its('status').should('equal', 200)
		cy.get('[class="alert bc-alert alert-success show"]').should('be.visible')
		cy.get('[value="Train"]').click()
		//cy.waitForVendorCred()
		cy.get('[id="vendor_credential"]').click()
		cy.get('[value="ADD"]').click()
		cy.xpath('//*[@name="name" and @placeholder="Enter Credential Name"]').type(credName)
		cy.readFile(watsonCred).then((text) => {
			cy.get('[class="CodeMirror-code"]').type(text);
		})
		cy.xpath("//*[@id='intet-form_btn-submit' and contains(text(),'Save Cred')]").click()
		cy.get('[id="trainVendor_btn-save"]').click()
		cy.waitForTrain()
		cy.get('[title="In Progress"]').should('be.visible')
		cy.get('[title="Domain Settings"]').click()
		cy.xpath('//h4[text()="More Settings"]').click()
		cy.get('[class="bc-icon bc-icon-delete"]').click()
		cy.get('[class="btn btn-primary"]').click()
		cy.waitForIntentBuilderHP().its('status').should('be',200)
		cy.get('[href="/#/dashboard"]').first().click()
		cy.xpath("//h3[text()='Bot Accounts']").click()
		cy.wait(10000)
		cy.xpath("//datatable-body-cell").last().click()
		cy.get('[title="Credentials"]').click()
		cy.waitForCreds()
		cy.get('[placeholder="Search"]').type(credName+'{enter}')
		cy.xpath('//div[@class="datatable-body-cell-label"]//button[@type="button"]').click({force:true})
		cy.xpath("//span[text()='Delete']").click()
		cy.get('[class="btn btn-primary"]').click()
		cy.contains('No credential found.')
	})
})