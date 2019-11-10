

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$ ( function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         */
         it('it has a URL defined is not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeTruthy();
            });
        });
        
        /*  test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         */         
        it('it has a name defined is not empty', function() {
             allFeeds.forEach(feed => {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });

    });

        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're per forming the
         * hiding/showing of the menu element.
         */
      describe('The menu', function() {
        const menu = document.querySelector('body');
        const icon = document.querySelector('.menu-icon-link');
        it('hide the menu element by default', () =>
            expect(menu.classList.contains('menu-hidden')).toBe(true));

         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */         
          it('display and hide the menu when clicked', function() {
             icon.click();
             expect(menu.classList.contains('menu-hidden')).toBe(false);
             icon.click();
             expect(menu.classList.contains('menu-hidden')).toBe(true);
         });

    });

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes        */
            describe('Initial Entries', function() {
        const feed = document.querySelector('.feed');
        const allEntries = [];

        beforeEach((done) => loadFeed(0, done));

        it('at least single entry element within the .feed', function() {
            for (let x = 0; x < feed.childElementCount; x++) {
                allEntries.push(feed.children[x]);
            }
            let a = allEntries.length;
            for (let i = 0; i < a; i++) {

                switch (allEntries[i].classList.contains('entry-link')) {
                    case true:
                            break;
                    case false:
                        allEntries.splice(i, 1);
                }
            }

            expect(allEntries.length > 0).toBe(true);
    })});
    
       describe('New Feed Selection', function() {
        let feed = document.querySelector('.feed');
        let feedFirstItems = [], feedSecondItems = [];

        beforeEach((done) => {
            loadFeed(0, () => {
                Array.from(feed.children).forEach(item => feedFirstItems.push(item.innerText));
                loadFeed(1, () => {
                    Array.from(feed.children).forEach(item => feedSecondItems.push(item.innerText));
                    done();
                });
            });
        });

        it('content changes when new feed is loaded',function () {
            Array.from(feed.children).forEach((item, index) => {
                expect(feedFirstItems).not.toEqual(feedSecondItems);
            });
            
        });
    });

}());

