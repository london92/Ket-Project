/**
 * Created by Admin on 29.08.2016.
 */
$(document).ready(function() {
    function heightDetect() {
        $("header").css("height", $(window).height());
    };
    heightDetect();
    $(window).resize(function () {
        heightDetect();
    });
});
    var app = angular.module("app",["smoothScroll","ngRoute","ngCookies","ngAnimate"]);
    app.controller("serviceCtrl",function ($scope) {
        $scope.text = 1;
        $scope.show_text = function (a) {
            $scope.text = a;
        }
    });
app.controller("portfolioCtrl",function ($scope) {
    $scope.portfolio_item = "ALL";
    $scope.portfolio_item_show = function (a) {
        $scope.portfolio_item = a;
        }
    $scope.portfolio_filter = function (item) {
        if($scope.portfolio_item == "ALL"){
            return item;
    }
        if(item.name == $scope.portfolio_item){
            return item
        }
    }
    $scope.portfolio_items=[
        {name:"GRAPHIC DESIGN",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"},
        {name:"WEB",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"WEB",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"},
        {name:"GRAPHIC DESIGN",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"PHOTOGRAPHY",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"},
        {name:"GRAPHIC DESIGN",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"PHOTOGRAPHY",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"PHOTOGRAPHY",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"},
        {name:"WEB",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"WEB",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"},
        {name:"GRAPHIC DESIGN",header:"SAMPLE IMAGE",src:"img/portfolio_img_1.jpg"},
        {name:"GRAPHIC DESIGN",header:"SAMPLE IMAGE",src:"img/portfolio_img.jpg"}
    ]
});
app.directive("teamItem", function () {
    return{
        restrict: "A",
        scope: {
            data:"=infoAttr"
        },
        link: function (scope,elem,attr) {
            var img = angular.element("<img>").attr("src",scope.data.src);
            elem.append(img);
            var img_desc = angular.element("<div>").attr("class","img_desc");
            var name = angular.element("<h4>").text(scope.data.name);
            var position = angular.element("<p>").text(scope.data.position);
            img_desc.append(name);
            img_desc.append(position);
            elem.append(img_desc);
            var text_desc = angular.element("<p>").text(scope.data.description);
            elem.append(text_desc);
            var social = angular.element("<div>").attr("class","social");
            var facebook = angular.element("<span>").attr("class","fa fa-2x fa-facebook");
            var twitter = angular.element("<span>").attr("class","fa fa-2x fa-twitter");
            var google = angular.element("<span>").attr("class","fa fa-2x fa-google-plus");
            var dribbble = angular.element("<span>").attr("class","fa fa-2x fa-dribbble");
            social.append(facebook,twitter,google,dribbble);
            elem.append(social)
        }
    }
});
app.controller("aboutCtrl", function ($scope) {
    $scope.information = [
        {name: "Dead Pool",src:"img/team/deadpool.jpg",position:"Graphic Designer", description:"Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu."},
        {name: "Harley Quinn",src:"img/team/harley-quinn.jpg",position:"Photographer", description:"Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu."},
        {name: "Joker",src:"img/team/joker.jpg",position:"Web Developer", description:"Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu."},
        {name: "Mikado",src:"img/team/ss.jpg",position:"Graphic Designer", description:"Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu."}
    ]
});
app.directive("completeTask",function () {
    return{
        link: function (scope,elem,attr) {
               if(attr.completeTask == "COMPLETED PROJECTS"){
                   scope.src = "img/stat_project.png";
                   scope.desc = "COMPLETED PROJECTS";
               }
            else if(attr.completeTask == "CLICK PRESED"){
                   scope.src = "img/stat_click.png";
                   scope.desc = "CLICK PRESED";
               }
               else if(attr.completeTask == "MAILS SENTED & RECIVED"){
                   scope.src = "img/stat_mail.png";
                   scope.desc = "MAILS SENTED & RECIVED";
               }
               else if(attr.completeTask == "JOKES TOLDS"){
                   scope.src = "img/stat_jokes.png";
                   scope.desc = "JOKES TOLDS";
               }
            scope.start = 0;
            var img = angular.element("<img>").attr("src",scope.src);
            elem.append(img);
            var number = angular.element("<p>").text(scope.start);
            elem.append(number);
            var desc = angular.element("<h6>").text(scope.desc);
            elem.append(desc);

            scope.elemTop = elem.offset().top + 400;
            scope.elemBottom = scope.elemTop + elem.height();
            $(window).scroll(function () {
                    var docViewTop = $(window).scrollTop(),
                        docViewBottom = docViewTop + $(window).height();
                    if((scope.elemBottom <= docViewBottom) && (scope.elemTop <= docViewTop)){
                        if(attr.completeTask == "COMPLETED PROJECTS"){
                            var num = 3054;
                            var interval = setInterval(function () {
                                if(interval){
                                    return
                                }
                                num = num + 1;
                                number.text(num)
                            },1000)
                        }
                        else if(attr.completeTask == "CLICK PRESED"){
                           var num = 7234873;
                            var interval = setInterval(function () {
                                num = num + 1;
                                number.text(num)
                            },1000)
                        }
                        else if(attr.completeTask == "MAILS SENTED & RECIVED"){
                            num = 4670;
                        }
                        else if(attr.completeTask == "JOKES TOLDS"){
                            num = 939;
                        }
                        number.text(num);
                    }
                }
            )
        }
    }
});
function come(elem) {
    var docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height(),
        elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
app.controller("newsCtrl",function ($scope,$http,$location) {
    $http.get("data.json").success(function (responseData) {
        $scope.news = responseData;
        $scope.convert_date($scope.news);
    });
    $scope.convert_date = function (news) {
        for (var i =0; i< news.length; i++) {
            var string_date = news[i].date.split("/");
            var milliseconds_date = new Date(string_date[2], string_date[1] - 1, string_date[0]);
            news[i].date = milliseconds_date;
        }
    }
    $scope.go_to = function (path) {
        $location.path('/' + path);
    }
});
app.config(function ($routeProvider) {

    $routeProvider
        .when('/10', {
            template: '<div id="myModal" class="modal fade" role="dialog">\
            <div class="modal-dialog">\
                    <!-- Modal content-->\
            <div class="modal-content">\
                <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal">&times;</button>\
            <h4 class="modal-title">Modal Header</h4>\
            </div>\
            <div class="modal-body">\
                <p>Some text in the modal.</p>\
            </div>\
            <div class="modal-footer">\
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                </div>\
                </div>\
                </div>\
                </div>',
        })
        .when('/2', {
            templateUrl: '',
        })
        .when('/3', {
            templateUrl: ''
        })
});
app.controller("contactsCtrl", function ($scope,$cookieStore) {
    $scope.user = {name: "", email: ""};
    $scope.email_regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    $scope.name_regex = /([A-Za-z])/;
    $scope.message_regex = /[A-Za-z/ ,.?!А-Яа-я\d]{20,}/
    $scope.user.name = $cookieStore.get("name");
    $scope.user.email = $cookieStore.get("email");
    $scope.show_error = function (err) {
        if (angular.isDefined(err)) {
            if (err == "name") {
                return 'Name must consist of latin letters'
            }
            else if (err == "mail") {
                return "Invalid email!";
            }
            else if (err == "message") {
                return "Message must contain at least 20 symbols";
            }
        }
    }
    $scope.send_message = function () {
        $cookieStore.put("name", $scope.user.name);
        $cookieStore.put("email", $scope.user.email);
    }


});