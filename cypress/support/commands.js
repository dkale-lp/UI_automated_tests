// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';
import 'cypress-file-upload';


Cypress.Commands.add("login", () => {
	cy.server()
	cy.visit('/')
	cy.xpath('//*[@type="email"]').type('agent1@gmail.com')
	cy.xpath('//*[@type="password"]').type('Test1234')
	cy.xpath('//*[@type="submit"]').click()
	cy.route({
		method: 'POST',
		url: '/bot-platform-manager-0.1/login'
	}).as('login')
	cy.route({
		method: 'GET',
		url: '/bot-platform-manager-0.1/botLanguage/'
	}).as('botLanguage')
	cy.wait('@botLanguage', {
		timeout: 180000
	})
})

Cypress.Commands.add("waitForDataAnalyticsToLoad", (settimeout) => {
	cy.route({
		method: 'GET',
		url: '/bot-platform-manager-0.1/auth/analytics/**',
	}).as('chatbot')
	cy.wait('@chatbot', {
		timeout: settimeout
	})
});

Cypress.Commands.add("waitForAgentConnector", () => {
	cy.route({
		method: 'POST',
		url: '/bot-platform-manager-0.1/auth/log/**',
	}).as('agentconnector')
	cy.wait('@agentconnector', {
		timeout: 120000
	})
});

Cypress.Commands.add("deployInDemo", () => {
	cy.route({
		method: 'PUT',
		url: '/https://va-a.bc-mgmt.liveperson.net/service-monitoring-0.1/sysadmin/nodejs/instance/assignServer/**',
	}).as('demo')
	cy.wait('@demo', {
		timeout: 120000
	})
});


Cypress.Commands.add("waitForAccountToLoad", () => {
	cy.route({
		method: 'GET',
		url: '/live-engage-service-0.1/le/accounts/**',
	}).as('accounts')
	cy.wait('@accounts', {
		timeout: 120000
	})
});

Cypress.Commands.add('waitForCBLoad', ()=> {
	cy.route({
		method:'GET',
		url:'bot-platform-manager-0.1/chatbots?filterByTransferGroup=true'
	}).as('cbWait')
	cy.wait('@cbWait', {
		timeout: 120000
	})
})

Cypress.Commands.add('waitForInteraction',()=>{
	cy.route({
		method:'GET',
		url:'bot-platform-manager-0.1/chat/*/interaction/'
	}).as('loadinteraction')
	cy.wait('@loadinteraction', {
		timeout: 120000		
	})
})

Cypress.Commands.add('waitForConfig',()=>{
	cy.route({
		method:'GET',
		url:'botservice-0.1/botcentral/debugger/*'
	}).as('config')
	cy.wait('@config', {
		timeout: 120000		
	})
})
Cypress.Commands.add('waitForCalendar',()=>{
	cy.route({
		method:'GET',
		url:'/bot-platform-manager-0.1/auth/analytics/**'
	}).as('config')
	cy.wait('@config', {
		timeout: 120000		
	})
})

Cypress.Commands.add('waitForIntentBuilderHP',()=>{
	cy.route({
		method:'GET',
		url:'/bot-platform-manager-0.1/domain/getByOrgId'
	}).as('config')
	cy.wait('@config', {
		timeout: 120000		
	})
})

Cypress.Commands.add('createDomainWait',()=>{
	cy.route({
		method:'GET',
		url:'/bot-platform-manager-0.1/intent/domain/**'
	}).as('domain')
	cy.wait('@domain', {
		timeout: 120000		
	})
})

Cypress.Commands.add('waitForVendorCred',()=>{
	cy.route({
		method:'GET',
		url:'/auth-service-0.1/credentials/**'
	}).as('credprov')
	cy.wait('@credprov', {
		timeout: 120000		
	})
})


Cypress.Commands.add('waitForTrain',()=>{
	cy.route({
		method:'GET',
		url:'/bot-platform-manager-0.1/domainModelVersion*'
	}).as('train')
	cy.wait('@train', {
		timeout: 120000		
	})
})

Cypress.Commands.add('domainDeleteWait',()=>{
	cy.route({
		method:'DELETE',
		url:'/bot-platform-manager-0.1/domain*'
	}).as('domain_del')
	cy.wait('@domain_del', {
		timeout: 120000		
	})
})

Cypress.Commands.add('waitForCreds',()=>{
	cy.route({
		method:'GET',
		url:'/auth-service-0.1/credentials'
	}).as('cred')
	cy.wait('@cred', {
		timeout: 120000		
	})
})

Cypress.Commands.add('botDeleteWait',()=>{
	cy.route({
		method:'DELETE',
		url:'/bot-platform-manager-0.1/bots/*'
	}).as('bot_del')
	cy.wait('@bot_del', {
		timeout: 120000		
	})
})

Cypress.Commands.add('agentDeleteWait',()=>{
	cy.route({
		method:'DELETE',
		url:'/bot-platform-manager-0.1/auth/liveperson/app/*'
	}).as('agent_del')
	cy.wait('@agent_del', {
		timeout: 120000		
	})
})
