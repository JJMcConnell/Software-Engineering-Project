'use strict';

module.exports = {
	app: {
	    title: 'The University of Florida Department of Music Presents: Room Scheduler',
		description: 'A Calendar Application for the University of Florida Music Department.',
		keywords: 'calendar, application, music, schedule, scheduling, request, event, events'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/fullcalendar/dist/fullcalendar.css',
                'public/lib/bootstrap-datepicker/css/datepicker.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/jquery-ui/ui/jquery-ui.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/moment/moment.js',
				'public/lib/fullcalendar/dist/fullcalendar.js',
				'public/lib/angular-ui-calendar/src/calendar.js',
				'public/lib/bootstrap-datepaginator/src/js/bootstrap-datepaginator.js',
				'public/lib/bootstrap-datepicker/js/bootstrap-datepicker.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};