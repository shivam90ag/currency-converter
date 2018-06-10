import { AbcdPage } from './app.po';

describe('abcd App', () => {
  let page: AbcdPage;

  beforeEach(() => {
    page = new AbcdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
