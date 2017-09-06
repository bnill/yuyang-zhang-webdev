(function () {
    angular
        .module("WamApp")
        .controller("widgetFlickrSearchController", widgetFlickrSearchController);

    function widgetFlickrSearchController($routeParams, widgetService, $location, flickrService) {
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {

        }
        init();

        function selectPhoto(photo) {
            //console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget =  {'_id': model.wgid,
                'name': '',
                'text': '',
                'url': url,
                'widgetType': 'IMAGE',
                'pageId': model.pid,
                'width': ''};
            widgetService
                .updateWidget(model.wgid, widget)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + model.wgid);
                });
        }

        function searchPhotos(searchtext) {
            //console.log(searchtext);
            flickrService
                .searchPhotos(searchtext)
                .then(function(response) {
                    //console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
    }
})();