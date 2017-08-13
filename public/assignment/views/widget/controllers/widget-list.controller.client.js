(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $location, $sce){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.getYoutubeVideo = getYoutubeVideo;
        model.trust_html = trust_html;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            //console.log(model.widgets);
        }
        init();

        function getYoutubeVideo(url){
            var embedUrl = "https://www.youtube.com/embed/";
            var UrlParts = url.split('/');
            embedUrl += UrlParts[UrlParts.length - 1];
            //console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust_html(html){
            return  $sce.trustAsHtml(html);
        }
    }
})();