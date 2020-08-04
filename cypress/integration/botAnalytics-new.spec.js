require('cypress-xpath')

var randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
var botName = "Automation_Bot_" + randomNumber;
describe('Bot Analytics', function() {
	after(() => {
		//delete the bot
		cy.get('[class="bc-more-icon-round"]').click()
		cy.xpath("//a[text()='Bot Settings']").click()
		cy.wait('@loadinteraction', {
			timeout: 120000
		})
		cy.xpath("//h4[text()='More Settings']").click()
		cy.get('[aria-label="deleteBot"]').click()
		cy.get('[class="btn btn-primary"]').click()
		cy.waitForCBLoad()
	})

	it('Create bot - check matched and unmatched intents', function() {
		// login 
		cy.login();
		cy.xpath("//h3[text()='Conversation Builder']").click()
		cy.waitForCBLoad()
		//create bot
		cy.get('[id="bna-create-bot"]').click()
		cy.wait(5000)
		cy.get('[id="bc-cb-bot-template-basics-Custom Bot"]').click()
		cy.get('[id="createbot_btn-save"]').click()
		cy.get('[name="name"]').type(botName)
		cy.xpath('//textarea[@name="description"]').type('Automation_Bot_Desc')
		cy.get('[id="createbot_btn-save"]').click()
		cy.waitForInteraction().its('status').should('eq', 200)
		cy.waitForConfig()
		// enter intents in preview
		cy.xpath('//button[text()="Preview"]').click()
		var phrases = ['Kakashi', 'Hatake', 'Sensei', 'Copy Ninja',
			'kopi', 'Itachi', 'Konohamaru', 'Naruto', 'Sasuke', 'Tsunade', 'Hashirama',
			'Madara', 'Sai', 'Sakumo', 'white fang', 'yellow flash', 'minato', 'jiraiya',
			'shikamaru', 'yahiko', 'konan', 'nagato', 'nishinoya', 'shoyo', 'kageyama'
		];
		cy.get('[id="previewpanel"]')
			.then(function($iframe) {
				const $jbody = $iframe.contents().find('body')
				const $body = $jbody[0]
				cy.wait(10000)
				for (var i = 0; i < phrases.length; i++) {
					cy.wrap($body).find('.user-input_cls').type(phrases[i])
					cy.wrap($body).find('.send-button').click()
				}
			})
		// close button in preview
		cy.get('[class="b"]').click()
		// back to home page
		cy.xpath("//span[text()='Back']").click()
		cy.waitForCBLoad()
		cy.xpath("//span[text()='Back']").click()
		// goto bot analytics
		cy.xpath("//h3[text()='Bot Analytics']").click()
		cy.waitForDataAnalyticsToLoad(180000)
		cy.xpath('//*[@name="search"]').type(botName + "{enter}")
		// set last 7 days in date picker
		cy.xpath('//*[@class="datatable-body-cell-label"]').first().click()

		//cy.visit("/analytics/bots/6dbc4d05-4470-464c-ac8d-01bfb8195933/overview")
		cy.waitUntil(() =>
			cy
			.get("[id='button_date']")
			.should('be.visible'), {
				timeout: 10000,
				interval: 1000,
				errorMsg: 'Datepicker ele not visible '
			});
		cy.get("[id='button_date']").click()
		cy.xpath('//label[text()="Date range"]/..//*[@role="combobox"]').click()
		cy.xpath('//*[@class="mat-option-text" and contains(text(),"Last Seven Days")]').click()
		cy.get('[id="date-btn-submit"]').click()
		cy.waitForCalendar()
		// goto intents page in bot analytics
		cy.xpath("//span[text()='Intents']").click()
		cy.xpath("//a[contains(text(),' Unmatched Phrases ')]").click()
		cy.waitForCalendar()
		cy.waitForCalendar()
		cy.get('[class="datatable-icon-skip"]').click()
		// check if the second page in unmatched phrases has this text
		cy.xpath("//span[text()='21-25']")
		cy.xpath("//span[text()='Overview']").click()
		cy.waitForCalendar()
		cy.xpath("//*[text()='Questions Asked']/..//div[contains(@class,'value')]")
			.should('have.text', ' 25 ')
		cy.xpath("//*[text()='Matched Intents']/..//div[contains(@class,'value')]")
			.should('have.text', ' 0 ')
		cy.xpath("//*[text()='Unmatched Phrases']/..//div[contains(@class,'value')]")
			.should('have.text', ' 25 ')
		cy.get('[id="overview-COMMON.SECTION.SESSIONS"]').should('have.text', '0')
		cy.get('[id="overview-COMMON.SECTION.MESSAGES"]').should('have.text', '25')

	})
})