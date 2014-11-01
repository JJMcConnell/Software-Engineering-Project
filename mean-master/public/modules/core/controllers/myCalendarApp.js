'use strict';

angular.module('core').controller('myCalendarApp', ['$scope', '$stateParams', '$location', '$http', 'Authentication',
    function ($scope, $stateParams, $location, $http, Authentication ) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

        // This is a global variable for events. This will contain every event.
        // The scope is changed every time you go to a new month, so $scope.events will be reset.
        // We can either do it this way, storing every event ever at once, or another way to do
        // it would be to reload the events each time you chose a different month. Maybe that's 
        // better, but this works and I didn't feel like changing it.
    var events = [];

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
        /* event source that contains custom events on the scope */
        // Reinitialize the events when the scope is changed

    $scope.events = [];/*
      { title: 'All Day Event', start: new Date(y, m, 1) },
      { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
      { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
      { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
      { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
      { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
    ];*/

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      //var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        //callback(events);
    };

    $scope.calEventsExt = {
       color: '#f00',
       textColor: 'yellow',
       events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
    };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
        $scope.alertMessage = (event.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
         $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
         console.log(minuteDelta);
         //if(event.start._i<new Date(event.start._i.getYear(), event.start._i.getMonth(),event.start._i.getDay(), 7, 25));
         //event._start._i = new Date(event._start._i.getYear(), event._start._i.getMonth(), event._start._i.getDay(), 7, 25);
         
         console.log(revertFunc);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function () {
        console.log(y);
        console.log(m);
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28, 9),
        end: new Date(y, m, 28, 10)
      });
      $location.path('calendar');

    };

    $scope.fetchEvents = function () {

        $http.get('/fetchEvents', $scope.credentials).success(function (response) {
            
            console.log(response);

            for (var event in response) {
                
                //console.log(response[event].year);
                //console.log(response[event].month);
                console.log(m);
                var hour = 6;
                var minute = 20;
                var period = parseInt(response[event].time_period);
                if (period < 12) {
                    hour += period;
                    minute += period * 5;
                } else
                {
                    hour = 7 + (period - 12);
                    minute = 20;
                }
                console.log(hour);
                $scope.events.push({
                    title: response[event].title,
                    // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                    start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                    //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                    end: new Date(response[event].year, response[event].month-1, response[event].day, hour+1, minute-10)
                });
            }

            // And redirect to the index page
            //$location.path('');
        }).error(function (response) {
            $scope.error = response.message;
        });
        
    };

    $scope.createPeriodOpenings = function () {
        var hour = 6;
        var minute = 20;
        for (var period = 1; period < 16; period++) {

            hour = 6 + period;
            minute = 20 + (period * 5);

            console.log(hour);
            $scope.events.push({
                title: "CLICK TO BOOK",
                // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                start: new Date(2014, 11, 7, hour, minute),
                end: new Date(2014, 11, 7, hour + 1, minute - 10),
                url: '/'
            });
        }
        $scope.events.push({
            title: "There are 11 events on this day. Click to expand",
            // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
            start: new Date(2014, 11, 8, 9, 35),
            end: new Date(2014, 11, 8, 10, 35),
            url: '/'
        });
    }


    $scope.fetchRoomEvents = function (roomNumber) {
        
        console.log(roomNumber);
        $http.get('/fetchEventsFromRoom?room='+roomNumber).success(function (response) {
            // If successful we assign the response to the global user model
            console.log(response[0]);

            for (var event in response) {
                console.log(response[event].year);
                console.log(response[event].month);
                console.log(m);
                var hour = 6;
                var minute = 20;
                var period = response[event].period;
                if (period < 12) {
                    hour += period;
                    minute += period * 5;
                } else {
                    hour = 7 + (period - 12);
                    minute = 20;
                }
                $scope.events.push({
                    title: response[event].title,
                    // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                    start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                        end: new Date(response[event].year, response[event].month - 1, response[event].day, hour + 1, minute)
                });
            }
            
            // And redirect to the index page
            //$location.path('/roomCalendar');
        }).error(function (response) {
            
            $scope.error = response.message;
            $location.path('/roomCalendar');
        });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        calendar.fullCalendar('changeView', view);

        
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
        calendar.fullCalendar('render');

        
    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            slotDuration: '01:05:00',
            minTime: '07:25:00',
            maxTime: '22:20:00',
        height: 500,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    $scope.changeLang = function() {
      if($scope.changeTo === 'Hungarian'){
        $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
        $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
        $scope.changeTo= 'English';
      } else {
        $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        $scope.changeTo = 'Hungarian';
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];
    //$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


/* EOF */
     
        

    }
]);