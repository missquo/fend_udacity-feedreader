/* All tests are placed inside the $() function, to ensure they 
 * don't run until the DOM is ready, since some tests 
 * require DOM elements.
 */
 
$(function() {
	/* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
	describe('RSS Feeds', () => {
		/* Tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty. 
         */
		it('are defined', () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Tests that loops through each feed in the allFeeds
         * object and ensures it has a URL defined and that
         * the URL is not empty.
         */
		it('URLs are defined and not empty', () => {
			allFeeds.forEach(feed => {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});
		});

		/* Test that loops through each feed in the allFeeds
         * object and ensures it has a name defined and that
         * the name is not empty.
         */
		it('names are defined and not empty', function() {
			allFeeds.forEach(feed => {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});	    
	});

	/* Test suite for the menu */
	describe('The menu', () => {
		var bodyElement = document.querySelector('.header').parentElement;
		/* Test that ensures the menu element is hidden by default.*/
		it('is hidden by default', () => {
			expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
		});
		
		/* Test that ensures the menu changes visibility when the menu 
		 * icon is clicked. */
		it('displays and hides when clicked', () => {
			var hamburger = document.querySelector('.menu-icon-link');
			hamburger.click();
			expect(bodyElement.classList.contains('menu-hidden')).toBe(false);
			hamburger.click();
			expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
		});
	});
	
	/* Test suite to verify initial entries */
	describe('Initial entries', () => {
		/* Test that ensures when the loadFeed function is called
         * and completes its work, there is at least a single 
         * .entry element within the .feed container.
         */ 

		beforeEach(done => {
			loadFeed(0, done);
		});
		
		it('load correctly', () => {
			var feed = document.querySelector('.feed');
			var feedLength = feed.getElementsByClassName('entry').length;
			expect(feedLength).toBeGreaterThan(0);
		});
	});
	
	/* Test suite to verify new feed selection */
	describe('New feed selection', () => {
		var feed1, feed2;

		/* Test that ensures when a new feed is loaded by the
         * loadFeed function that the content actually changes.
         */
		beforeEach(done => {
			loadFeed(0, () => {
				feed1 = document.querySelector('.entry').innerText;
				loadFeed(1, () => {
					feed2 = document.querySelector('.entry').innerText;
					done();
				});
			});
		});
			
		it('loads correctly', () => {
			expect(feed1).not.toEqual(feed2);
			expect(feed2).toBeDefined();
		});
		
	});
}());