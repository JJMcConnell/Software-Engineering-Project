describe('angularjs homepage', function() {


	beforeEach(function() {
		browser.get('http://localhost:3000')
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('The University of Florida Department of Music Presents: Room Scheduler')
	});

	

});