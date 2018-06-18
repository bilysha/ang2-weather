import { Weather2Page } from './app.po';

describe('weather2 App', function() {
  let page: Weather2Page;

  beforeEach(() => {
    page = new Weather2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
