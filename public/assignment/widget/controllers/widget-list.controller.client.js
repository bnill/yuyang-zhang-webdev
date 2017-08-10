(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $location, $sce){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.widgetViewUrl = widgetViewUrl;
        model.getYoutubeVideo = getYoutubeVideo;
        model.trust_html = trust_html;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            //console.log(model.widgets);
        }
        init();

        function widgetViewUrl(widget){
            var url = 'widget/templates/views/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            //console.log(url);
            return url;
        }

        function getYoutubeVideo(url){
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = url.split('/');
            embedUrl += url[url.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust_html(html){
            return  $sce.trustAsHtml(html);
        }
    }
})();