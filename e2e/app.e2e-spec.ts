import { Angular2StompTestPage } from './app.po';

describe('angular2-stomp-test App', () => {
  let page: Angular2StompTestPage;

  beforeEach(() => {
    page = new Angular2StompTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
