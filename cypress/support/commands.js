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
		method:'POST',
		url:'/bot-platform-manager-0.1/domain/model/train'
	}).as('train')
	cy.wait('@train', {
		timeout: 120000		
	})
})