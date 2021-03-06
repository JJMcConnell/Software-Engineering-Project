﻿'use strict';

angular.module('core').controller('myCalendarApp', ['$scope', '$stateParams', '$location', '$http', 'Authentication', '$modal',
    function ($scope, $stateParams, $location, $http, Authentication, $modal) {

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

        $scope.events = [];
        $scope.dayEvents = [];
        $scope.weekEvents = [];
        $scope.monthEvents = [];/*
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
               { type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Lunch 2', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false },
               { type: 'party', title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
            console.log('Clicked!!!');
            $scope.alertMessage = (event.title + ' was clicked ');
            console.log(event.start);
            var size = 100;
            var butId = 100;
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return { date: new Date(event.start.toString()).toISOString().substring(0, 10), period: event.period };
                    },
                    buttonId: function () {
                        return currentRoom;
                    }
                }


            });


            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                console.log('selected item' + selectedItem);
            }, function (message) {
                console.log(message);
                //$log.info('Modal dismissed at: ' + new Date());
                if (message == 'done')
                    $scope.openSuccess();
            });


        };


        $scope.openSuccess = function () {
            var modalInstance = $modal.open({
                templateUrl: 'ModalSuccess.html',
                controller: 'ModalInstanceCtrl',
                size: 100,
                resolve: {
                    items: function () {
                        return "Success!";

                    },
                    buttonId: function () {
                        return "ONE HUNDRED!";
                    }
                }
            });
        }

        /* alert on Drop */
        $scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
            console.log(minuteDelta);
            //if(event.start._i<new Date(event.start._i.getYear(), event.start._i.getMonth(),event.start._i.getDay(), 7, 25));
            //event._start._i = new Date(event._start._i.getYear(), event._start._i.getMonth(), event._start._i.getDay(), 7, 25);

            console.log(revertFunc);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
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


        var currentRoom = '';
        var currentPeriod = 0;

        var loaded = false;
       
        $scope.newRoomPage = function (tag) {

            
            
            if (tag != currentRoom && currentRoom!= ")please select a room)") {

                //$scope.fetchRoomEvents(roomNum);
                //currentRoom = tag;
                //$location.

            } 

            var roomNumber = window.location.href.substr(window.location.href.indexOf(tag) + tag.length);
            /*if (window.location.href.indexOf(tag) == -1) {
                currentRoom = ")please select a room)";
                return "(please select a room)";
            }
            

            console.log("SOMETHING CHANGED!!!!!!!!!");
            console.log("ROOM IS NOW SET TO " + roomNumber);
            console.log(window.location.href);
            console.log("STUFF!!!!!!");
            if (currentRoom != '' && currentRoom != roomNumber) {
                while ($scope.events.length > 0) {
                    $scope.events.pop();
                }
                //$scope.events.clear();
                $scope.fetchRoomEvents(roomNumber);
            }
            loaded = true;
            currentRoom = roomNumber;
            */
            //I LOVE MAKESHIFT SOLUTIONS!!!!!!!!!!!!!!!!
            return roomNumber;

        }



        $scope.fetchEvents = function () {
            document.getElementById("loadingModal").hidden = false;
            while ($scope.events.length > 0) {
                $scope.events.pop();
            }
            //$scope.addRemoveEventSource($scope.eventSources, $scope.monthEvents);
            //$scope.addRemoveEventSource($scope.eventSources, $scope.events);
            $http.get('/fetchEvents', $scope.credentials).success(function (response) {
                /*$scope.createPeriodOpenings();
                console.log("\n\n\nhello hello hello hello");
                    // first we should store all the events that we have
                var startTime = new Date().getTime();
                // LOOP for days
                for (var day = 14; day < 15; day++) {
                    // LOOP for periods
                    for(var period = 1; period < 2; period++) {
                        var hour = 6;
                        var minute = 20;
                        if (period < 12) {
                            hour += period;
                            minute += period * 5;
                        } 
                        else {
                            hour = 7 + (period - 12);
                            minute = 20;
                        }
                        var endHour = hour + 1;
                        var endMinute = minute - 10;
                        $scope.events.push({
                            title: "event",
                            // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                            start: new Date(2014, 10, day, hour, minute),
                            end: new Date(2014, 10, day, endHour, endMinute)
                        });
                        var endTime = new Date().getTime();
                        console.log("\n\nTime taken is "+(endTime-startTime)+" milliseconds");
                    }
                }
                */

                console.log(response);


                // fill the calendar with dummy events

                for (var event in response) {
                    //console.log(response[event].year);
                    //console.log(response[event].month);
                    //console.log(m);

                    // first we should store all the events that we have
                    var hour = 6;
                    var minute = 20;
                    var period = parseInt(response[event].period);
                    if (period < 12) {
                        hour += period;
                        minute += period * 5;
                    } else {
                        hour = 7 + (period - 12);
                        minute = 20;
                    }
                    var endHour = hour + 1;
                    var endMinute = minute - 10;
                    if (response[event].length) {
                        if (response[event].length > 1) {
                            endHour = endHour + (response[event].length - 1);
                            endMinute = endMinute + (response[event].length - 1) * 5;
                        }
                    }
                    console.log(hour);
                    $scope.dayEvents.push({
                        title: response[event].title,
                        // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                        start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                        //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                        end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                    });



                    var extraEvents = 1;
                    var flagSecondEvent = false;
                    var secondEventNum = 0;
                    if ($scope.events.length > 0)
                        for (var i = $scope.events.length - 1; i--;) {
                            console.log("DAY" + $scope.events[i].start.getDate() + " " + response[event].day);
                            console.log("MONTH" + $scope.events[i].start.getMonth() + " " + (response[event].month - 1));
                            console.log("YEAR" + $scope.events[i].start.getFullYear() + " " + response[event].year);
                            if ($scope.events[i].start.getDate() == response[event].day && $scope.events[i].start.getMonth() == (response[event].month - 1) && $scope.events[i].start.getFullYear() == response[event].year) {
                                extraEvents++;
                                if ($scope.events[i].title == response[i].title) {
                                    //$scope.events[i].title = "2 events";
                                    flagSecondEvent = true;
                                    secondEventNum = i;
                                }
                                else if ((parseInt($scope.events[i].title.substring(0, 1)) + 1) > 1) {
                                    //$scope.monthEvents[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                    $scope.monthEvents[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                    $scope.events[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                } else {
                                    $scope.monthEvents[i].title = "2 events";
                                    $scope.events[i].title = "2 events";
                                }
                            }
                            //$scope.monthEvents.splice(i, 1);
                            //$scope.events.splice(i, 1);
                        }
                    if (flagSecondEvent) {
                        $scope.events[secondEventNum].title = "2 events";
                        $scope.monthEvents[secondEventNum].title = "2 events";
                    }
                    if (extraEvents == 1) {
                        $scope.events.push({
                            title: response[event].title,
                            // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                            start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                            //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                            end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                        });

                        $scope.monthEvents.push({
                            title: response[event].title,
                            // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                            start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                            //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                            end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                        });

                    }
                    
                    document.getElementById("loadingModal").hidden = true;
                    
                        //$scope.eventSources = [$scope.monthEvents];
                }
                
                // And redirect to the index page
                //$location.path('');
            }).error(function (response) {
                $scope.error = response.message;
            });
            monthEvents = [];
            var i = 0;
            while ($scope.monthEvents.length < $scope.events.length) {
                $scope.monthEvents.push($scope.events[i]);

                i++;
            }

             

        };

        $scope.requestView = function (calendar) {
            //if(calendar)
              //  $scope.changeView('agendaDay', calendar);
        }

        
        $scope.fetchUnEvents = function (day, month, year, room, requestLength) {
            // to show when OPEN periods are, rather than 
            // TAKEN ones
            var selectedDate = new Date(year, month - 1, day); // get current date

            $http.get('/getDateSettings', $scope.credentials).success(function (response) {
                console.log(response);
                var startDate = new Date(parseInt(response.startYear), parseInt(response.startMonth) - 1, parseInt(response.startDay));
                var endDate = new Date(parseInt(response.endYear), parseInt(response.endMonth) - 1, parseInt(response.endDay));
                console.log('START ' + startDate);
                console.log('END' + endDate);
                if (selectedDate.getTime() < startDate.getTime() || selectedDate.getTime() > endDate.getTime())
                    $location.path('/room');
            }).error(function (response) {
                $scope.error = 'error';
                console.log('error');
            });


            
            

            /*var room = 120;
            var requestLength = 1;

            var year = selectedDate.getFullYear();
            var month = selectedDate.getMonth() + 1;
            var day = selectedDate.getDate();
            */
            var sunday = selectedDate.getDate() - selectedDate.getDay();
            var saturday = sunday + 6;

            var count = 0;
            for (var dayOfWeek = sunday; dayOfWeek <= saturday; dayOfWeek++) {
                var newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayOfWeek);
                var requestYear = newDate.getFullYear();
                var requestMonth = newDate.getMonth() + 1;
                var requestDay = newDate.getDate();
                if (requestDay < 10)
                    requestDay = "0" + requestDay;
                if (requestMonth < 10)
                    requestMonth = "0" + requestMonth;
                console.log(newDate.toDateString());
                // just in case year or month changes.
                $http.get('/getAvailablePeriods?year=' + requestYear + '&month=' + requestMonth + '&day=' + requestDay + '&length=1&room='+room).success(function (response) {


                    console.log(response);
                    console.log('count' + count); // fixes asynchronous stuff
                    for (var period = 1; period <= response.periods.length; period++) {
                        //console.log(response[event].year);
                        //console.log(response[event].month);   
                        // console.log(m);
                        var hour = 6;
                        var minute = 20;
                        if (period < 12) {
                            hour += period;
                            minute += period * 5;
                        } else {
                            hour = 7 + 12 + (period - 12);
                            minute = 20;
                        }

                        console.log(dayOfWeek);
                        if (response.periods[period - 1]) {
                            $scope.events.push({
                                title: 'CLICK TO BOOK',
                                // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                                start: new Date(response.year, response.month - 1, response.day, hour, minute),
                                //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                                end: new Date(response.year, response.month - 1, response.day, hour + 1, minute - 10),
                                period: period
                            });
                        }

                    }

                    count++;
                    if (count == 7)
                        document.getElementById("loadingModal").hidden = true;
                        //document.getElementById('loadingModal').class = "modal hide fade";
                    document.getElementById('title').innerHTML = 'Available Periods';

                    // And redirect to the index page
                    //$location.path('');
                }).error(function (response) {
                    $scope.error = response.message;
                });
            }
        };

        $scope.createPeriodOpenings = function () {
            var hour = 6;
            var minute = 20;
            for (var period = 1; period < 15; period++) {

                hour = 6 + period;

                minute = 20 + (period * 5);
                if (period > 11) {
                    hour++;
                    minute = 20;
                }

                console.log(hour);
                $scope.events.push({
                    title: "CLICK TO BOOK",
                    // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                    start: new Date(2014, 11, 7, hour, minute),
                    end: new Date(2014, 11, 7, hour + 1, minute - 10),
                    url: '/#!/myModalContent.html'
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

            //if (currentRoom != '' && currentRoom != roomNumber) {
                console.log("NEW ROOM!!!!!!!!");
                console.log(roomNumber);
                document.getElementById("loadingModal").hidden = false;


                while ($scope.events.length > 0) {
                    $scope.events.pop();
                }
                //$scope.addRemoveEventSource($scope.eventSources, $scope.monthEvents);
                //$scope.addRemoveEventSource($scope.eventSources, $scope.events);
                $http.get('/fetchEventsFromRoom?room=' + roomNumber).success(function (response) {
                    /*$scope.createPeriodOpenings();
                        console.log("\n\n\nhello hello hello hello");
                            // first we should store all the events that we have
                        var startTime = new Date().getTime();
                        // LOOP for days
                        for (var day = 14; day < 15; day++) {
                            // LOOP for periods
                            for(var period = 1; period < 2; period++) {
                                var hour = 6;
                                var minute = 20;
                                if (period < 12) {
                                    hour += period;
                                    minute += period * 5;
                                } 
                                else {
                                    hour = 7 + (period - 12);
                                    minute = 20;
                                }
                                var endHour = hour + 1;
                                var endMinute = minute - 10;
                                $scope.events.push({
                                    title: "event",
                                    // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                                    start: new Date(2014, 10, day, hour, minute),
                                    end: new Date(2014, 10, day, endHour, endMinute)
                                });
                                var endTime = new Date().getTime();
                                console.log("\n\nTime taken is "+(endTime-startTime)+" milliseconds");
                            }
                        }
                        */

                    console.log(response);


                    // fill the calendar with dummy events

                    for (var event in response) {
                        //console.log(response[event].year);
                        //console.log(response[event].month);
                        //console.log(m);

                        // first we should store all the events that we have
                        var hour = 6;
                        var minute = 20;
                        var period = parseInt(response[event].period);
                        if (period < 12) {
                            hour += period;
                            minute += period * 5;
                        } else {
                            hour = 7 + (period - 12);
                            minute = 20;
                        }
                        var endHour = hour + 1;
                        var endMinute = minute - 10;
                        if (response[event].length) {
                            if (response[event].length > 1) {
                                endHour = endHour + (response[event].length - 1);
                                endMinute = endMinute + (response[event].length - 1) * 5;
                            }
                        }
                        console.log(hour);
                        $scope.dayEvents.push({
                            title: response[event].title,
                            // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                            start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                            //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                            end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                        });



                        var extraEvents = 1;
                        var flagSecondEvent = false;
                        var secondEventNum = 0;
                        if ($scope.events.length > 0)
                            for (var i = $scope.events.length - 1; i--;) {
                                console.log("DAY" + $scope.events[i].start.getDate() + " " + response[event].day);
                                console.log("MONTH" + $scope.events[i].start.getMonth() + " " + (response[event].month - 1));
                                console.log("YEAR" + $scope.events[i].start.getFullYear() + " " + response[event].year);
                                if ($scope.events[i].start.getDate() == response[event].day && $scope.events[i].start.getMonth() == (response[event].month - 1) && $scope.events[i].start.getFullYear() == response[event].year) {
                                    extraEvents++;
                                    if ($scope.events[i].title == response[i].title) {
                                        //$scope.events[i].title = "2 events";
                                        flagSecondEvent = true;
                                        secondEventNum = i;
                                    }
                                    else if ((parseInt($scope.events[i].title.substring(0, 1)) + 1) > 1) {
                                        //$scope.monthEvents[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                        $scope.monthEvents[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                        $scope.events[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                    } else {
                                        $scope.monthEvents[i].title = "2 events";
                                        $scope.events[i].title = "2 events";
                                    }
                                }
                                //$scope.monthEvents.splice(i, 1);
                                //$scope.events.splice(i, 1);
                            }
                        if (flagSecondEvent) {
                            $scope.events[secondEventNum].title = "2 events";
                            $scope.monthEvents[secondEventNum].title = "2 events";
                        }
                        if (extraEvents == 1) {
                            $scope.events.push({
                                title: response[event].title,
                                // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                                start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                                //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                                end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                            });

                            $scope.monthEvents.push({
                                title: response[event].title,
                                // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                                start: new Date(response[event].year, response[event].month - 1, response[event].day, hour, minute),
                                //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                                end: new Date(response[event].year, response[event].month - 1, response[event].day, endHour, endMinute)
                            });

                        }
                        
                        document.getElementById("loadingModal").hidden = true;

                        //$scope.eventSources = [$scope.monthEvents];
                    }
                    // And redirect to the index page
                    //$location.path('');
                }).error(function (response) {
                    $scope.error = response.message;
                });
                monthEvents = [];
                var i = 0;
                while ($scope.monthEvents.length < $scope.events.length) {
                    $scope.monthEvents.push($scope.events[i]);

                    i++;
                }

            //}

            currentRoom = roomNumber;

        };

        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        var currentView = 'month';
        /* Change View */
        $scope.changeView = function (view, calendar) {
            
            document.getElementById("loadingModal").hidden = false;

            if (view == 'month' && currentView != 'month') {
                while ($scope.events.length > 0) {
                    $scope.events.pop();
                }
                var i = 0;
                while ($scope.events.length < $scope.monthEvents.length) {
                    $scope.events.push($scope.monthEvents[i]);
                    i++;
                }
            }
            else if (view == 'agendaDay' && currentView != 'agendaDay')
            {
                while ($scope.events.length > 0) {
                    $scope.events.pop();
                }
                var i = 0;
                while ($scope.events.length < $scope.dayEvents.length) {
                    $scope.events.push($scope.dayEvents[i]);
                    i++;
                }
               
            }
            else if (view == 'agendaWeek' && currentView != 'agendaWeek')
            {
                if ($scope.weekEvents.length == 0) {


                    
                    
                    for (var day = 0; day < $scope.dayEvents.length; day++) {

                        var response = $scope.dayEvents[day];
                        console.log(response);
                        var extraWeekEvents = 1;
                        var flagSecondWeekEvent = false;
                        var secondWeekEventNum = 0;
                        if ($scope.weekEvents.length > 0)
                            for (var i = $scope.weekEvents.length - 1; i--;) {
                                //console.log("DAY" + $scope.weekEvents[i].start.getDate() + " " + response.day);
                                //console.log("MONTH" + $scope.weekEvents[i].start.getMonth() + " " + (response.month - 1));
                                //console.log("YEAR" + $scope.weekEvents[i].start.getFullYear() + " " + response.year);
                                if ($scope.weekEvents[i].start == response.start) {
                                    extraWeekEvents++;
                                    if ($scope.weekEvents[i].title == response.title) {
                                        //$scope.events[i].title = "2 events";
                                        flagSecondWeekEvent = true;
                                        secondWeekEventNum = i;
                                    }
                                    else if ((parseInt($scope.weekEvents[i].title.substring(0, 1)) + 1) > 1) {
                                        //$scope.monthEvents[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                        $scope.weekEvents[i].title = (parseInt($scope.weekEvents[i].title.substring(0, 1)) + 1) + " events";
                                        //$scope.events[i].title = (parseInt($scope.events[i].title.substring(0, 1)) + 1) + " events";
                                    } else {
                                        $scope.weekEvents[i].title = "2 events";
                                        //$scope.events[i].title = "2 events";
                                    }
                                }
                                //$scope.monthEvents.splice(i, 1);
                                //$scope.events.splice(i, 1);
                            }
                        if (flagSecondWeekEvent) {
                            //$scope.events[secondEventNum].title = "2 events";
                            $scope.weekEvents[secondWeekEventNum].title = "2 events";
                        }


                        if (extraWeekEvents == 1) {
                            
                            $scope.weekEvents.push({
                                title: response.title,
                                // Minus one because apperently January is the 0th month these days. I freakin hate programming. Well, sometimes.
                                start: response.start,
                                //It's smart enough to react when minutes are negative. THANK YOU JAVASCRIPT!!
                                end: response.end
                            });

                        }


                    }




                }


                while ($scope.events.length > 0) {
                    $scope.events.pop();
                }
                var i = 0;
                while ($scope.events.length < $scope.weekEvents.length) {
                    $scope.events.push($scope.weekEvents[i]);
                    i++;
                }

            }
            calendar.fullCalendar('changeView', view);
            
            //$location.path('calendar');
            currentView = view;

            document.getElementById("loadingModal").hidden = true;

        };

          $scope.changeReqView = function (view, calendar) {
            
               calendar.fullCalendar('changeView', view);
        


        };

        /* Change View */
        $scope.renderCalender = function (calendar) {
            calendar.fullCalendar('render');


        };
        /* config object */
        /*
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
    */
        $scope.initRequest = function (day, month, year, room, period) {
            currentRoom = room;
            console.log('INIT REQUEST');
            $scope.uiConfig = {
                calendar: {
                    slotDuration: '01:05:00',
                    minTime: '07:25:00',
                    maxTime: '22:20:00',
                    height: 500,
                    editable: false,
                    defaultDate: new Date(year, month - 1, day),
                    defaultView: 'agendaDay',
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    hideButtons: true, // I made this option!!
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize
                }
            };

        };

        $scope.uiConfig = {
            calendar: {
                slotDuration: '01:05:00',
                minTime: '07:25:00',
                maxTime: '22:20:00',
                height: 500,
                editable: false,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
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