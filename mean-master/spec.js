describe('angularjs homepage', function() {

//all of the room buttons
	var room101 = element(by.id('101'));
	var room106 = element(by.id('106B'));
	var room120 = element(by.id('120'));
	var room121 = element(by.id('121'));
	var room142 = element(by.id('142'));
	var room143 = element(by.id('143'));
	var room144 = element(by.id('144'));
	var room145 = element(by.id('145'));
	var room146 = element(by.id('146'));
	var room147 = element(by.id('147'));
	var room232 = element(by.id('232'));
	var room233 = element(by.id('233A'));

	var cancelButton = element(by.buttonText("Cancel"));

//Array containing all of the room options and random number within array
	var roomButtons = [room101, room106, room120, room121, room142, room143, room144, room145, room146, room147, room232, room233];
	var randomnumber = Math.floor(Math.random() * (11 - 0 + 1)) + 0;


	var modal = element(by.className('modal-header'));

	beforeEach(function() {
		browser.get('http://localhost:3000')
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('The University of Florida Department of Music Presents: Room Scheduler')
	});

	it('should open up the modal', function() {

		roomButtons[randomnumber].click();

		expect(modal.isPresent()).toBeTruthy();

	});

	 it('should have a working cancel button on the modal', function() {

	 	
	 		roomButtons[randomnumber].click();
	 		cancelButton.click();
	 	
	 	expect(modal.isPresent()).toBeFalsy();

	});

	 it('should log into the admin account', function() {

	 	


	 });



});