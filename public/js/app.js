var app = angular.module('notes', ['notes.directives']);

app.controller('NoteCtrl', function ($scope, $http, $filter) {

    $scope.note = resetModel();
    $scope.lastModified=null;

    $http.get('/getNotes').then(function (obj) {
        $scope.Notes = obj.data.data;
        $scope.totalNotes = $scope.Notes.length;
    }, function (e) {
        console.log(e);
    });

    $scope.addNote = function (ev) {
        if ($(ev.target).hasClass('collapsed')) {
            $scope.mode = 'Add';
            $scope.reset();
        }
    };

    $scope.editNote = function (id) {
        var tcheck = $filter('filter')($scope.Notes, {_id: id});
        if (tcheck.length) {
            $scope.mode = 'Edit';
            var o = tcheck[0];
            $scope.note = JSON.parse(angular.toJson(o));
            $('.collapse').collapse('show');
        }
    };

    $scope.saveNote = function () {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.NoteForm.$valid) {
            var model = JSON.parse(angular.toJson($scope.note));
            var url;
            if ($scope.mode === 'Add') {
                url = '/addNote';
                model.created = new Date();
            } else {
                url = '/editNote';
                model.updated = new Date();
            }
            $http.post(url, model).then(function (obj) {
                var d = obj.data;
                var data = d.data;
                var msg = d.message;
                if (msg === 'success') {
                    if ($scope.mode === 'Add') {
                        $scope.Notes.push(data);
                        $scope.totalNotes++;
                    } else {
                        var index;
                        for (var i = 0, l = $scope.Notes.length; i < l; i++) {
                            var r = $scope.Notes[i];
                            if (r._id == model._id) {
                                index = i;
                                break;
                            }
                        }
                        $scope.Notes[index] = model;
                        $scope.lastModified = model;
                    }
                    $('.cor-icon').click();
                }
            }, function (e) {
                console.log(e);
            });
        }
    };

    function resetModel() {
        return {
            title: '',
            desc: '',
            editable: true,
            updated: null,
            created: null
        };
    }

    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.note = resetModel();
    };

});