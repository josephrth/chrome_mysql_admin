chromeMyAdmin.directive("favoriteListPanel", function() {
    "use strict";

    return {
        restrict: "E",
        templateUrl: "templates/favorite_list_panel.html"
    };
});

chromeMyAdmin.controller("FavoriteListController", ["$scope", "mySQLClientService", "favoriteService", "Events", function($scope, mySQLClientService, favoriteService, Events) {
    "use strict";

    var assignWindowResizeEventHandler = function() {
        $(window).resize(function(evt) {
            adjustFavoriteListHeight();
        });
    };

    var adjustFavoriteListHeight = function() {
        $("#favoriteList").height($(window).height() - 51 - 35);
    };

    var loadFavorites = function() {
        favoriteService.getAll().then(function(favorites) {
            $scope.favorites = favorites;
        });
    };

    var assignEventHandlers = function() {
        $scope.$on(Events.FAVORITES_CHANGED, function(event, favorites) {
            loadFavorites();
        });
    };

    $scope.initialize = function() {
        assignWindowResizeEventHandler();
        adjustFavoriteListHeight();
        assignEventHandlers();
        loadFavorites();
    };

    $scope.isFavoriteListVisible = function() {
        return !mySQLClientService.isConnected();
    };

    $scope.selectFavorite = function(name) {
        favoriteService.select(name);
    };

    $scope.deleteFavorite = function($event, name) {
        favoriteService.delete(name);
        $event.preventDefault();
    };

    $scope.connectFromFavorite = function($event, name) {
        favoriteService.selectAndLogin(name);
    };

}]);
