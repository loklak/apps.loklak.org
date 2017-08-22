// tests for home page

describe("Testing Loklak apps home page", function() {
  beforeEach(function() {
    browser.get("http://127.0.0.1:8080/");
  });

  it("should have a category name", function() {
    expect(element(by.id("categoryName")).getText()).toEqual("All apps");
  });

  it("should have top menu", function() {
    let list = element.all(by.css(".topmenu li a"));
    expect(list.count()).toBe(5);
  });

  it("should have a category list", function() {
    let categoryIds = ["All", "Scraper", "Search", "Visualizer", "LoklakLibraries", "InternetOfThings", "Misc"];
    let categoryNames = ["All", "Scraper", "Search", "Visualizer", "Loklak Libraries", "Internet Of Things", "Misc"];

    expect(element(by.css("#catTitle")).getText()).toBe("Categories");

    let categoryList = element.all(by.css(".category-main"));
    expect(categoryList.count()).toBe(7);

    categoryIds.forEach(function(id, index) {
      element(by.css("#" + id)).isPresent().then(function(present) {
        expect(present).toBe(true);
      });

      element(by.css("#" + id)).getText().then(function(text) {
        expect(text).toBe(categoryNames[index]);
      });
    });
  });

  it("category list should respond to click", function() {
    let categoryIds = ["All", "Scraper", "Search", "Visualizer", "LoklakLibraries", "InternetOfThings", "Misc"];
    let categoryNames = ["All apps", "Scraper", "Search", "Visualizer", "Loklak Libraries", "Internet Of Things", "Misc"];

    categoryIds.forEach(function(id, index) {
      element(by.id(categoryIds[index])).click().then(function() {
        browser.getCurrentUrl().then(function(url) {
          expect(url).toBe("http://127.0.0.1:8080/#/" + categoryIds[index]);
        });
        element(by.id("categoryName")).getText().then(function(text) {
          expect(text).toBe(categoryNames[index]);
        });
      });
    });
  });
});
