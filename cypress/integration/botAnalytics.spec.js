require('cypress-xpath')

var randomNumber = Math.floor(Math.random() * (999 - 100) + 100);
var botName = "Automation_Bot_" + randomNumber;
describe('Bot Analytics', function() {
	it('Create bot', function() {
		cy.login();
		cy.xpath("//h3[text()='Conversation Builder']").click()
		cy.waitForCBLoad()
		cy.get('[id="bna-create-bot"]').click()
		cy.xpath('//*[@class="bot_name" and text()="Custom Bot"]').click()
		cy.get('[name="name"]').type(botName)
		cy.xpath('//textarea[@name="description"]').type('Automation_Bot_Desc')
		cy.get('[id="createbot_btn-save"]').click()
		cy.waitForInteraction().its('status').should('eq', 200)
		cy.waitForConfig()
		cy.xpath('//button[text()="Preview"]').click()
		var phrases = ['hi', 'hello', 'Kakashi', 'Hatake', 'Sensei', 'Copy Ninja',
			'kopi', 'Itachi', 'Konohamaru', 'Naruto', 'Sasuke', 'Tsunade', 'Hashirama',
			'Madara', 'Sai', 'Sakumo', 'white fang', 'yellow flash', 'minato', 'jiraiya',
			'shikamaru', 'yahiko', 'konan', 'nagato', 'nishinoya', 'shoyo', 'kageyama'
		];

		cy.get('[id="previewpanel"]')
			.then(function($iframe) {
				const $jbody = $iframe.contents().find('body')
				const $body = $jbody[0]
				for (var i = 0; i < phrases.length; i++) {
					cy.wrap($body).find('.user-input_cls').type(phrases[i])
					cy.wrap($body).find('.send-button').click()
				}
			})
		cy.get('[class="b"]').click()
		cy.xpath("//span[text()='Back']").click()
		cy.waitForCBLoad()
		cy.xpath("//span[text()='Back']").click()
		cy.xpath("//h3[text()='Bot Analytics']").click()
		cy.waitForDataAnalyticsToLoad(180000)
		cy.xpath('//*[@name="search"]').type(botName + "{enter}")
		cy.xpath('//*[@class="datatable-body-cell-label"]').first().click()
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
		cy.xpath("//span[text()='Intents']").click()
		cy.xpath("//a[contains(text(),' Unmatched Phrases ')]").click()
		cy.waitForCalendar()
		cy.get('[class="datatable-icon-skip"]').click()
		cy.wait(60000)
	})

})