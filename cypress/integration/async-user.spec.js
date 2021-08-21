function asyncUserTest(testPath) {
  beforeEach(() => {
    cy.visit(testPath);
  });

  it('화면이 보이는지 테스트', () => {
    cy.get('h1').should('have.text', 'Async Test');
    cy.get('.user-list').should('be.visible');
    cy.get('.user-list > li').should('have.length', 10);
    cy.get('.re-fetch').should('be.visible');
  });

  // it('user list 에서 특정 user 를 클릭하면 해당 user 가 보임', () => {

  it('user list 에서 특정 user 를 클릭하면 해당 user 가 보임', () => {
    cy.get('.user-list > li b').eq(0).click();
    cy.get('.user').should('be.visible');
    cy.get('.user').should('have.contain', 'Email');
  });

  it('user list 에서 첫 번째 유저를 클릭하면 Bret 유저가 보임', () => {
    cy.get('.user-list > li b').eq(0).click();

    cy.get('.user').should('be.visible');
    cy.get('.user > h1').should('have.contain', 'Bret');
    cy.get('.user').should('have.contain', 'Email');
    cy.get('.user').should('have.contain', 'Sincere@april.biz');
  });
  it('user list 에서 네 번째 유저를 클릭하면 Kamren 유저가 보임', () => {
    cy.get('.user-list > li b').eq(4).click();

    cy.get('.user').should('be.visible');
    cy.get('.user > h1').should('have.contain', 'Kamren');
    cy.get('.user').should('have.contain', 'Email');
    cy.get('.user').should('have.contain', 'Lucio_Hettinger@annie.ca');
  });
}

describe('ASYNC USER 테스트', () => {
  describe('V1 - ASYNC USER 테스트 - App', () => {
    asyncUserTest('/v1-async-user-app/');
  });

  describe('V1 - ASYNC USER 테스트 - Components', () => {
    asyncUserTest('/v1-async-user-components/');
  });

  describe('V2 - ASYNC USER 테스트 - App', () => {
    asyncUserTest('/v2-async-user-app/');
  });

  describe('V2 - ASYNC USER 테스트 - Components', () => {
    asyncUserTest('/v2-async-user-components/');
  });
});
