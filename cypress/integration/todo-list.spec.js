function todoListTest(testPath) {
  beforeEach(() => {
    cy.visit(testPath);
  });

  it('화면이 보이는지 테스트', () => {
    cy.get('h1').should('have.text', 'TODO-LIST');
    cy.get('.todoInput').should('be.visible');
    cy.get('.addTodoBtn').should('be.visible');
    cy.get('.list').should('be.visible');
    cy.get('.buttonGroups').should('be.visible');
    cy.get('.allView').should('be.visible');
    cy.get('.activeView').should('be.visible');
    cy.get('.inactiveView').should('be.visible');
  });

  it('등록 기능 테스트', () => {
    cy.get('.todoInput').type(`${ADD_TODO_ITEM_TEXT}{enter}`);
    // cy.get('.list').find('li').eq(-1).contains(`${ADD_TODO_ITEM_TEXT}`);
    cy.get('.list').contains(`${ADD_TODO_ITEM_TEXT}`);
  });

  it('삭제 기능 테스트', () => {
    // todo-list 에 마지막 아이템 제거,
    //todo-list 에 마지막 아이템 존재하는지 확인
    cy.get('.list > li').should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
      expect($lis.eq(1)).to.contain('리액트 흉내내기');
      expect($lis.eq(2)).to.contain('TDD 해보기');
    });

    cy.get('.list').find('li').eq(-1).find('button.deleteBtn').click();

    cy.get('.list > li').should(($lis) => {
      expect($lis).to.have.length(2);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
      expect($lis.eq(1)).to.contain('리액트 흉내내기');
    });
  });
  it('토글 기능 테스트', () => {
    cy.get('.list > li').should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
      expect($lis.eq(1)).to.contain('리액트 흉내내기');
      expect($lis.eq(2)).to.contain('TDD 해보기');
    });

    // given
    cy.get('.list > li').eq(1).as('secnodItem');

    // when?
    cy.get('@secnodItem').find('span').should('have.attr', 'style', 'text-decoration: none');
    cy.get('@secnodItem').find('button.toggleBtn').click();
    cy.get('@secnodItem')
      .find('span')
      .should('have.attr', 'style', 'text-decoration: line-through');
  });
  it('필터링 기능 테스트', () => {
    cy.get('.list > li').should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
      expect($lis.eq(1)).to.contain('리액트 흉내내기');
      expect($lis.eq(2)).to.contain('TDD 해보기');
    });

    cy.get('.list > li').as('lis');

    cy.get('@lis').should('have.length', 3);

    // 활성 보기 기능
    cy.get('.activeView').click();
    cy.get('@lis').should(($lis) => {
      expect($lis).to.have.length(2);
      expect($lis.eq(0)).to.contain('리액트 흉내내기');
      expect($lis.eq(1)).to.contain('TDD 해보기');
    });
    // 비활성 보기 기능
    cy.get('.inactiveView').click();
    cy.get('@lis').should(($lis) => {
      expect($lis).to.have.length(1);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
    });
    // 전체 보기 기능
    cy.get('.allView').click();
    cy.get('@lis').should(($lis) => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('컴포넌트 개발');
      expect($lis.eq(1)).to.contain('리액트 흉내내기');
      expect($lis.eq(2)).to.contain('TDD 해보기');
    });
  });
}

const ADD_TODO_ITEM_TEXT = 'Cypress TEST';

describe('투두리스트 테스트', () => {
  xdescribe('투두리스트 컴포넌트 테스트 - App', () => {
    todoListTest('/v1-todo-list-app');
  });

  describe('투두리스트 컴포넌트 테스트 - components', () => {
    todoListTest('/v1-todo-list-components');
  });
});
