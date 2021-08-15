function counterTest(testPath) {
  beforeEach(() => {
    cy.visit(testPath);
  });

  it('화면이 보이는지 테스트', () => {
    cy.get('h1').should('have.text', 'Counter');
    cy.get('.diffInput').should('be.visible');
    cy.get('.diffSubmit').should('have.text', 'diff 설정');
    cy.get('.counter').should('have.text', '0');
    cy.get('.increaseBtn').should('have.text', '+1');
    cy.get('.decreaseBtn').should('have.text', '-1');
  });

  it('diff 인풋 변경(5)', () => {
    cy.get('.diffInput').should('have.text', '');

    cy.get('.diffInput').clear().type(5);
    cy.get('.diffSubmit').click();
    cy.get('.diffInput').should('have.value', '5');
  });

  it('증가 기능 테스트', () => {
    cy.get('.counter').should('have.text', 0);

    cy.get('.increaseBtn').click();
    cy.get('.counter').should('have.text', 1);

    cy.get('.increaseBtn').click();
    cy.get('.increaseBtn').click();
    cy.get('.counter').should('have.text', 3);
  });

  it('감소 기능 테스트', () => {
    cy.get('.counter').should('have.text', 0);

    cy.get('.decreaseBtn').click();
    cy.get('.counter').should('have.text', -1);

    cy.get('.decreaseBtn').click();
    cy.get('.decreaseBtn').click();
    cy.get('.counter').should('have.text', -3);
  });

  it('diff 인풋 변경(5) 및 증가/감소 테스트', () => {
    cy.get('.diffInput').should('have.text', '');

    cy.get('.diffInput').clear().type(5);
    cy.get('.diffSubmit').click();

    cy.get('.increaseBtn').click();
    cy.get('.increaseBtn').click();
    cy.get('.counter').should('have.text', 10);

    cy.get('.decreaseBtn').click();
    cy.get('.counter').should('have.text', 5);
  });
}

describe('카운터 테스트', () => {
  // describe('카운터 컴포넌트 테스트 v1', () => {
  //   counterTest('/v1-counter-1/');
  // });
  describe('카운터 컴포넌트 테스트 - App', () => {
    counterTest('/v1-counter-app/');
  });
  describe('카운터 컴포넌트 테스트 - components', () => {
    counterTest('/v1-counter-components/');
  });
});
