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
	var room232 = element(by.id('232'));
	var room233 = element(by.id('233A'));

//all of the period buttons
	var period1 = element(by.id('1'));
	var period2 = element(by.id('2'));
	var period3 = element(by.id('3'));
	var period4 = element(by.id('4'));
	var period5 = element(by.id('5'));
	var period6 = element(by.id('6'));
	var period7 = element(by.id('7'));
	var period8 = element(by.id('8'));
	var period9 = element(by.id('9'));
	var period10 = element(by.id('10'));
	var period11 = element(by.id('11'));
	var periodE1 = element(by.id('E1'));
	var periodE2 = element(by.id('E2'));
	var periodE3 = element(by.id('E3'));




//These should be all of the modal options. Note: if by.model doesn't work try id
	var modName = element(by.model('request.name'));
	var modEmail = element(by.model('request.email'));
	var modPhone = element(by.model('request.telephone'));
	var modSponsor = element(by.model('request.sponsor'));
	var modOrganization = element(by.model('request.organization'));
	var modDescription = element(by.model('request.description'));
	var modDate = element(by.id('inputDate'));
	var modPeriod = element(by.model('request.period'));
	var modLength = element(by.model('request.length'));
	var submitButton = element(by.buttonText("Submit"));
	var cancelButton = element(by.buttonText("Cancel"));
	var okayButton = element(by.buttonText("Okay"));
	var closeButton = element(by.buttonText("Close"));



//Array containing all of the room options and random number within array
	var roomButtons = [room101, room106, room120, room121, room142, room143, room144, room145, room146, room232, room233];
	var roomPeriods = [period1, period2, period3, period4, period5, period6, period7, period8, period9, period10, period11, periodE1, periodE2, periodE3];
	var randomnumber = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
	var randomperiod = Math.floor(Math.random() * (14 - 0 + 1)) + 0;

	var adminUser = element(by.id('username'));
	var adminPass = element(by.id('password'));


	var modal = element(by.id('modalTitle'));
/*
	beforeEach(function() {
		browser.get('http://localhost:3000');
		
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

	}); */

	 it ('should have a working contact page', function() {

	 	browser.get('http://localhost:3000/#!/contact');

	 	expect(element(by.id('pick')).isPresent()).toBeTruthy();
	 });



	 it('should create an event', function() {


	 	browser.get('http://localhost:3000/#!/period');

	 	roomPeriods[randomperiod].click();

	 	
	 	
	 	modName.sendKeys('John Johnson');
		//element(by.id('five')).click();
	 	//element(by.id('lOne')).click();
	 	element(by.cssContainingText('option', '120')).click();
	 	modEmail.sendKeys('JohnJJohnson@gmail.com');
	 	modPhone.sendKeys('123-456-7890');
	 	modSponsor.sendKeys('Dr. Will Williston');
	 	modOrganization.sendKeys('French Horn Fanatics');
	 	modDescription.sendKeys('We found a fine fortress for which we frequently fumble our French fanfares');
	 	//modDate.sendKeys('12252015');
	 
	 	submitButton.click();
		
		//expect(modal.isPresent()).toBeTruthy();

		expect(modal.isPresent()).toBeFalsy();


	 }); 

	it('should log into the admin account', function() {

	 	browser.get('http://localhost:3000/#!/signin');

	 	element(by.id('username')).sendKeys('trevor');
	 	element(by.id('password')).sendKeys('admin1234');

	 	element(by.buttonText("Sign in")).click();

	 	element(by.id('approved')).click();

	 	element(by.id('pending')).click();

	 	element(by.id('adsettings')).click();

	 	element(by.id('back')).click();

	 	element(by.id('pending')).click();

	 	element(by.id('deny')).click();

	 	submitButton.click();

	 	element(by.id('infor')).click();

	 	closeButton.click();



	 	expect(adminUser.isPresent()).toBeFalsy();


	 }); 

/*
	it('should go to a specific room calendar ', function() {

		browser.get('http://localhost:3000/#!/period');

		element(by.id("p101")).click();

		expect(element(by.id("p101")).isPresent()).toBeFalsy();

	});
*/


});