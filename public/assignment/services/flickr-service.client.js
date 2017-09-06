(function () {
    angular
        .module("WamApp")
        .service("flickrService", flickrService);
    
    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "60198772f78ca13252aaf92f7d520d63";
        var secret = "311928ce1b436e2e";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchText) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();