describe('stSelectRow Directive', function () {

    var controllerMock = {
        select: angular.noop
    };

    var rootScope;
    var scope;
    var element;

    function hasClass(element, classname) {
        return Array.prototype.indexOf.call(element.classList, classname) !== -1
    }

    beforeEach(module('smart-table', function ($controllerProvider) {
        $controllerProvider.register('stTableController', function () {
            return controllerMock;
        });
    }));

    describe('single mode', function () {
        beforeEach(inject(function ($compile, $rootScope) {

            rootScope = $rootScope;
            scope = $rootScope.$new();
            rootScope.rowCollection = [
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ];

            var template = '<table st-table="rowCollection">' +
                '<tbody>' +
                '<tr st-select-row="row" ng-repeat="row in rowCollection"></tr>' +
                '</tbody>' +
                '</table>';

            element = $compile(template)(scope);

            scope.$apply();
        }));

        it('should select one row', function () {
            spyOn(controllerMock, 'select').andCallThrough();
            var trs = element.find('tr');
            expect(trs.length).toBe(5);
            angular.element(trs[3]).triggerHandler('click');
            expect(controllerMock.select).toHaveBeenCalledWith(scope.rowCollection[3], 'single');
        });

        it('should update the class name when isSelected property change', function () {

            var tr = element.find('tr');
            expect(hasClass(tr[2], 'st-selected')).toBe(false);
            scope.rowCollection[2].isSelected = true;
            scope.$apply();
            expect(hasClass(tr[2], 'st-selected')).toBe(true);

            scope.rowCollection[2].isSelected = false;
            scope.$apply();
            expect(hasClass(tr[2], 'st-selected')).toBe(false);
        });
    });

    describe('multiple mode', function () {
        beforeEach(inject(function ($compile, $rootScope) {

            rootScope = $rootScope;
            scope = $rootScope.$new();
            scope.rowCollection = [
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ];

            var template = '<table st-table="rowCollection">' +
                '<tbody>' +
                '<tr st-select-mode="multiple" st-select-row="row" ng-repeat="row in rowCollection"></tr>' +
                '</tbody>' +
                '</table>';

            element = $compile(template)(scope);

            scope.$apply();
        }));

        it('should select multiple row', function () {
            spyOn(controllerMock, 'select').andCallThrough();
            var trs = element.find('tr');
            expect(trs.length).toBe(5);
            angular.element(trs[3]).triggerHandler('click');
            expect(controllerMock.select).toHaveBeenCalledWith(scope.rowCollection[3], 'multiple');
        });
    });


});
