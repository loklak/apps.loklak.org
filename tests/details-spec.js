describe("Testing Loklak app details page", function() {
  beforeEach(function() {
    browser.get("http://127.0.0.1:8080/details.html?q=MultiLinePlotter");
  });

  it("should have basic information", function() {
    expect(element(by.css(".app-name")).getText()).toEqual("MultiLinePlotter");
    expect(element(by.css(".app-headline")).getText()).toEqual("App to plot tweet aggregations and statistics");
    expect(element(by.css(".author")).getText()).toEqual("by Deepjyoti Mondal");
    expect(element(by.css(".short-desc")).getText()).toEqual("An applicaton to visually compare tweet statistics");
  });

  it("main content should not be empty", function() {
    expect(element(by.css(".get-started-md")).getText()).not.toBe("");
    expect(element(by.css(".app-use-md")).getText()).not.toBe("");
  });

  it("selected app category should be highlighted", function() {
    expect(element(by.css(".selected")).getText()).toBe("Visualizer");
  });

  it("menu items should respond to click", function() {
    let categoryIds = ["All", "Scraper", "Search", "Visualizer", "LoklakLibraries", "InternetOfThings", "Misc"];

    for(let index = 0; index < categoryIds.length; index++) {
      element(by.id(categoryIds[index])).click();
      expect(browser.getCurrentUrl()).toBe("http://127.0.0.1:8080/#/" + categoryIds[index]);
      browser.navigate().back();
    }
  });

  it("Try Now button should work", function() {
    element(by.css(".try-now")).click();
    expect(browser.getCurrentUrl()).toBe("http://127.0.0.1:8080/MultiLinePlotter/");
  });
});
