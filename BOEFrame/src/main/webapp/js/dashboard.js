require.config({
    baseUrl: 'js',
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },

        'handlebars': {
            exports: 'Handlebars'
        },
        'fileinput': {
            deps: ['jquery']
        },
        'backbone.stickit': {
            deps: ['backbone', 'jquery']
        },
        'backbone': {
            deps: ['underscore']
        },
        'bootstrap-table-ench': {
            deps: ['bootstrap-table']

        },

        'bootstrap-select': {

            deps: ['bootstrap']
        },
        'bootstrap-table': {
            deps: ['bootstrap', 'jquery']
        },
    },
    paths: {

        jquery: 'libs/jquery-1.11.1',
        handlebars: 'libs/handlebars-v2.0.0',
        bootstrap: 'libs/bootstrap',
        text: 'libs/text',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        'bootstrap-datepicker': 'libs/bootstrap-datepicker',
        'bootstrap-table': 'libs/bootstrap-table',

        'fileinput': 'libs/fileinput',
        'backbone.stickit': 'libs/backbone.stickit',
        'bootstrap-table-ench': 'ench/bootstrap-table-ench',
        'bootstrap-select': 'libs/bootstrap-select'

    }

});

require(['text!template/menu.hbs', 'text!template/slide-indicator.hbs',
    'text!template/slide-item.hbs', 'jquery', 'bootstrap',
    'handlebars', 'jquery', 'collection/menus',
    'collection/reportMemos', 'backbone'
], function(menuSrc,
    slideIndicatorSrc, slideItemSrc, jquery, bootstrap, Handlebars,
    $, MenuCollection, ReportMemoCollection, Backbone) {
    Handlebars.registerHelper('substring', function(passedString,
        options) {

        var hash = options.hash;

        var theString = passedString.substring(hash.start, hash.length);
        return new Handlebars.SafeString(theString);
    });

    var updateMemo = function(target, direction) {

        var memoId = $(target.relatedTarget).attr('data-id');
        var memoModel = memos.get(parseInt(memoId));
        updateMemoByModel(memoModel);

    };

    var updateMemoByModel = function(memoModel) {

        $('#reportMemo').html(memoModel.get('memo'));
    };

    var initForm = function(collection) {

        var data = collection.toJSON();

        var menuTemplate = Handlebars.compile(menuSrc);
        var menuHtml = menuTemplate({
            menus: data
        });

        $('#home').append(menuHtml);

        $("img").on("dblclick", function(evt) {
            var target = evt.target;
            var id = $(target).attr("data-id");
            if (id !== undefined) {
                window
                    .open(
                        "queryReport.do?menuId=" + id,
                        id,
                        "left=0,top=0,width=" + (screen.width - 10) + ",height=" + (screen.height - 70) + ",location=no,scrollbars=yes,menubars=no,toolbars=no,resizable=yes");
            }

        });
        $('#markMemo').on('click', markMemo);
        $('#reportMemoLink').on('click', LoadReportMemoList);
        $('.thumb').on('click', setThumbSelected);

    };

    var initSlide = function(collection) {

        var data = collection.toJSON();

        var slideIndicatorTemplate = Handlebars
            .compile(slideIndicatorSrc);
        var slideItemTemplate = Handlebars.compile(slideItemSrc);

        var slideIndicatorHtml = slideIndicatorTemplate({
            menus: data
        });
        var slideItemHtml = slideItemTemplate({
            menus: data
        });

        $(".carousel-indicators").html(slideIndicatorHtml);
        $(".carousel-inner").html(slideItemHtml);

        // $('.carousel').on('slide.bs.carousel', updateMemo);
        $('.carousel').carousel();
        $('.carousel').on('slid.bs.carousel', updateMemo);



        var memoModel = memos.at(0);
        updateMemoByModel(memoModel);

        $('.carousel img').hover(hoverIn, hoverOut);


        $(".carousel img").on("dblclick", function(evt) {
            var target = evt.target;
            var id = $(target).attr("data-menuId");
            if (id !== undefined) {
                window
                    .open(
                        "queryReport.do?menuId=" + id,
                        id,
                        "left=0,top=0,width=" + (screen.width - 10) + ",height=" + (screen.height - 70) + ",location=no,scrollbars=yes,menubars=no,toolbars=no,resizable=yes");
            }

        });


        resizeImage();
        $(window).on('resize', resizeImage);

    };

    var resizeImage = function() {

        $('.carousel img').css("height",
            window.innerHeight - $('.navbar').height() - 20);

        $('#sliderTab pre').css("height",
            window.innerHeight - $('.navbar').height() - 20);

    };

    var menus;

    var memos = new ReportMemoCollection();;

    var loadSlideItem = function() {

        memos.fetch({

            data: {
                node: 900,
                enabled: true,
                method: "getMemoList"
            },
            success: initSlide
        });

    };
    var loadMenuItem = function() {

        menus = new MenuCollection();

        menus.fetch({
            data: {
                node: 900
            },
            success: initForm
        });

    };

    var setThumbSelected = function(event) {

        $('.x-view-selected').removeClass('x-view-selected');
        $(event.target).parents('.thumb').addClass('x-view-selected');
    };

    var hoverIn = function(event) {

    };
    var hoverOut = function(event) {

        $('.carousel').carousel('next');

    };

    var markMemo = function() {

        require(['view/ModalMarkMemoView'],
            function(ModalMarkMemoView) {

                var modalId = _.uniqueId("modal_");
                var selectedId = $('.x-view-selected')
                    .attr('data-id');

                var menuModel = menus.get(parseInt(selectedId)).attributes;
                var model = new Backbone.Model({
                    'menuId': selectedId,
                    'modalId': modalId,
                    'menu': menuModel
                });

                var view = new ModalMarkMemoView({
                    model: model,
                    root: '#modals'
                });

                view.render();

                $('#modals').append(view.$el);
                $('#' + modalId).modal('show');
                $('#' + modalId).on('hidden.bs.modal',
                    loadSlideItem);

            });

    };

    var LoadReportMemoList = function() {

        require(['view/reportMemo/list'], function(ReportMemoListView) {

            var view = new ReportMemoListView({
                menus: menus
            });
            $('.tab-pane#reportMemoList').html(view.$el);

        });
    };

    loadMenuItem();
    loadSlideItem();

});
