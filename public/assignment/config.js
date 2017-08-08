(function myFunction() {
    angular.module("WamApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/",{
                templateUrl: "user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:userId/website", {
            templateUrl: "website/templates/website-list.view.client.html",
            controller: "websiteListController",
            controllerAs: "model"
            })
            .when("/user/:userId/website/new", {
                templateUrl: "website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid", {
                templateUrl: "website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:wid/page", {
                templateUrl: "page/templates/page-list.view.client.html"
                //controller:
                //controllerAs:
            })
            .when("/user/:userId/website/:wid/page/new", {
                templateUrl: "page/templates/page-new.view.client.html"
                //controller:
                //controllerAs:
            })
            .when("/user/:userId/website/:wid/page/:pid", {
                templateUrl: "page/templates/page-edit.view.client.html"
                //controller:
                //controllerAs:
            })
            .when("/user/:userId/website/:wid/page/:pid/widget", {
                templateUrl: "widget/templates/widget-list.view.client.html"
                //controller:
                //controllerAs:
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/new", {
                templateUrl: "widget/templates/widget-chooser.view.client.html"
                //controller:
                //controllerAs:
            })
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "widget/templates/widget-edit.view.client.html"
                //controller:
                //controllerAs:
            })
    }
})();
