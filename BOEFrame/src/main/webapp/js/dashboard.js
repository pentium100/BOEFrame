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
        'jquery-fullscreen': {
            deps: ['jquery']
        },

        'bootstrap-select': {

            deps: ['bootstrap']
        },
        'bootstrap-table': {
            deps: ['bootstrap', 'jquery']
        },
        'jquery.fileDownload': {

        }
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
        'bootstrap-select': 'libs/bootstrap-select',
        'jquery-cookie': 'libs/jquery-cookie',
        'jquery-fullscreen': 'libs/jquery.fullscreen',
        'jquery.fileDownload': 'libs/jquery.fileDownload'

    }

});

require(['text!template/menu.hbs', 'text!template/slide-indicator.hbs',
    'text!template/slide-item.hbs', 'jquery', 'bootstrap',
    'handlebars', 'jquery', 'collection/menus',
    'collection/reportMemos', 'backbone', 'jquery-cookie',
    'jquery-fullscreen'
], function(menuSrc, slideIndicatorSrc,
    slideItemSrc, jquery, bootstrap, Handlebars, $, MenuCollection,
    ReportMemoCollection, Backbone) {
    Handlebars.registerHelper('substring', function(passedString,
        options) {

        var hash = options.hash;

        var theString = passedString.substring(hash.start, hash.length);
        return new Handlebars.SafeString(theString);
    });

    Handlebars.registerHelper('getCurrentTime',
        function(date, options) {

            return new Handlebars.SafeString(+new Date);
        });

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {

            var k;

            // 1. Let O be the result of calling ToObject passing
            // the this value as the argument.
            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get
            // internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If len is 0, return -1.
            if (len === 0) {
                return -1;
            }

            // 5. If argument fromIndex was passed let n be
            // ToInteger(fromIndex); else let n be 0.
            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            // 6. If n >= len, return -1.
            if (n >= len) {
                return -1;
            }

            // 7. If n >= 0, then Let k be n.
            // 8. Else, n<0, Let k be len - abs(n).
            // If k is less than 0, then let k be 0.
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            // 9. Repeat, while k < len
            while (k < len) {
                var kValue;
                // a. Let Pk be ToString(k).
                // This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the
                // HasProperty internal method of O with argument Pk.
                // This step can be combined with c
                // c. If kPresent is true, then
                // i. Let elementK be the result of calling the Get
                // internal method of O with the argument ToString(k).
                // ii. Let same be the result of applying the
                // Strict Equality Comparison Algorithm to
                // searchElement and elementK.
                // iii. If same is true, return k.
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    var intervalCookieName = 'interval';
    var memoIdsCookieName = 'menoIds';
    var memoIdsCookieName2 = 'menoIds2';

    var updateMemo = function(target, direction) {

        var memoId = $(target.relatedTarget).attr('data-id');
        var memoModel = memos.get(parseInt(memoId));
        updateMemoByModel(memoModel);

    };

    var updateMemoByModel = function(memoModel) {

        $('#memoBy').html(memoModel.get('memoBy') + '<br>' + memoModel.get('keyDate'));
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

                var win = $(target).data("data-window");
                if (win !== undefined && !win.closed) {

                    win.focus();

                } else {
                    win = window
                        .open(
                            "queryReport.do?menuId=" + id,
                            id,
                            "left=0,top=0,width=" + (screen.width - 10) + ",height=" + (screen.height - 70) + ",location=no,scrollbars=yes,menubars=no,toolbars=no,resizable=yes");

                    $(target).data("data-window", win);
                }
            }

        });
        // $('#markMemo').on('click', markMemo);
        $('#reportMemoLink').on('click', LoadReportMemoList);
        $('a[href=#slideSetting]').on('click', LoadMemoOptions);

        $('.thumb').on('click', setThumbSelected);

    };

    var getImageSize = function(image) {

        var img = new Image();
        img.src = image.src;
        return {
            width: img.width,
            height: img.height
        };
    };

    var resizeImage = function() {

        var height = window.innerHeight - $('.navbar').height() - 60;

        $('#sliderTab pre#reportMemo').css("height", (height - 35 - $('#memoBy').height() - $('.postscript-files-list').height() + 'px'));

        $('.carousel .img').css("height", height);
        // console.log(height);

    };

    var initSlide = function(collection) {

        var data = collection.toJSON();

        var sIds = $.cookie(memoIdsCookieName);
        var sIds2 = $.cookie(memoIdsCookieName2);
        var interval = $.cookie(intervalCookieName);
        if (interval === undefined) {
            interval = 10000;
        } else {
            interval = interval * 1000;
        }

        var ids = [];
        var ids2 = [];

        if (sIds !== undefined) {
            ids = sIds.split(',');
        }

        if (sIds2 !== undefined) {
            ids2 = sIds2.split(',');
        }

        for (var i = data.length - 1; i >= 0; i--) {
            var idx = ids.indexOf(data[i].id);
            var idx2 = ids2.indexOf(data[i].id);
            if (idx2 >= 0) {
                data.splice(i, 1);

            }
        }

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
        $('.carousel').carousel({
            interval: interval
        });
        // $('.carousel').on('slid.bs.carousel', updateMemo);

        var memoModel = memos.at(0);
        if (memoModel !== undefined) {
            // updateMemoByModel(memoModel);
        }

        $('.carousel img').hover(hoverIn, hoverOut);

        $(".carousel .img").on("dblclick", function(evt) {
            var target = evt.target;
            var id = $(target).attr("data-menuId");
            var menuItem = $('img[data-id=' + id + ']');

            if (id !== undefined) {
                var win = $(menuItem).data('data-window');
                if (win != undefined && !win.closed) {
                    win.focus();
                } else {

                    win = window
                        .open(
                            "queryReport.do?menuId=" + id,
                            id,
                            "left=0,top=0,width=" + (screen.width - 10) + ",height=" + (screen.height - 70) + ",location=no,scrollbars=yes,menubars=no,toolbars=no,resizable=yes");

                    $(menuItem).data('data-window', win);
                }
            }

        });

        $(window).ready(resizeImage);

        $(window).on('resize', resizeImage);

        $(document).ready(function() {
            $(document).fullScreen(true);
        });

    };

    var initDashboard = function() {

        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            // console.log(e.target);
            if (e.target.id === "jumpToSlide") {

                $(".tab-content").addClass("memo");
            } else {
                $(".tab-content").removeClass("memo");

            }

        });

    };

    var menus;

    var vent = new _.extend({}, Backbone.Events);

    var memos = new ReportMemoCollection();

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

    vent.bind('app:updateSlide', loadSlideItem);
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

        // $('.carousel').carousel('next');

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

    var currentView = null;

    var LoadReportMemoList = function() {

        require(['view/reportMemo/list'], function(ReportMemoListView) {

            if (currentView !== null) {

                currentView.trigger('closeView');

            }
            var view = new ReportMemoListView({
                menus: menus,
                vent: vent
            });
            $('.tab-pane#reportMemoList').html(view.$el);
            currentView = view;

        });
    };

    var LoadMemoOptions = function() {

        require(['view/slideSetting/list'], function(SlideSettingView) {

            if (currentView !== null) {

                currentView.trigger('closeView');

            }

            var view = new SlideSettingView({

                vent: vent
            });
            currentView = view;
            $('.tab-pane#slideSetting').html(view.$el);

        });

    };

    loadMenuItem();
    loadSlideItem();
    initDashboard();

});
