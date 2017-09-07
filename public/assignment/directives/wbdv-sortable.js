(function () {
    angular
        .module("WamApp")
        .directive("wbdvDirectives", wbdvDirectives);

    function wbdvDirectives(widgetService) {
        var initial = -1;
        var end = -1;
        function linkFunction(scope, element) {
            //console.log(element);
            element.sortable({
                scroll: true,
                //axis: "y",
                start: function (event, ui) {
                    //console.log("sorting begin");
                    initial = ui.item.index();
                    //console.log(initial);
                },
                stop: function (event, ui) {
                    //console.log("sorting stop");
                    end = ui.item.index();
                    //console.log([initial, end]);
                    widgetService
                        .sortWidget(initial, end);
                }
            });
        }

        return{
            link: linkFunction
        }
    }
})();