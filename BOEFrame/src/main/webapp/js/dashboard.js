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

        },
        'jquery.smartmenus.bootstrap': {
            deps: ['jquery', 'jquery.smartmenus']

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
        'jquery.fileDownload': 'libs/jquery.fileDownload',
        'jquery.smartmenus.bootstrap': 'libs/jquery.smartmenus.bootstrap',
        'jquery.smartmenus': 'libs/jquery.smartmenus'

    }

});

require(['text!template/menu.hbs', 'text!template/slide-indicator.hbs',
    'text!template/slide-item.hbs', 'text!template/slide.hbs', 'collection/indicators', 'jquery', 'bootstrap',
    'handlebars', 'collection/menus',
    'collection/reportMemos', 'collection/indicatorSets', 'backbone', 'jquery-cookie',
    'jquery-fullscreen'
], function(menuSrc, slideIndicatorSrc,
    slideItemSrc, slideSrc, Indicators, jquery, bootstrap, Handlebars, MenuCollection,
    ReportMemoCollection, IndicatorSets,Backbone) {
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

        $('#home').html(menuHtml);

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

        $('.thumb').on('click', setThumbSelected);
        
        setMenuItemActive($('#mainTab'), $('a[href=#home]'));

    };
    
    var setMenuItemActive = function($ul, $el){
    	
    	
    	$ul.children('li').removeClass('active');
    	$el.parent('li').addClass('active');
    	
    	
    };
    
    $(window).ready(function () {
    	    /*
    	
    	     * Scroll the window to avoid the topnav bar
    	     * https://github.com/twitter/bootstrap/issues/1768
    	     */
    	    if ($(".navbar-default.navbar-fixed-top").length > 0) {
    	      // var navHeight = $(".navbar").height(),
    	      var navHeight = 40,
    	        shiftWindow = function() { scrollBy(0, -navHeight - 10); };
    	
    	      if (location.hash) {
    	        setTimeout(shiftWindow, 1);
    	      }
    	
    	      window.addEventListener("hashchange", shiftWindow);
    	    }
    	  });


    var LoadIndicatorList = function() {

        require(['view/indicator/list'], function(IndicatorListView) {

            if (currentView !== null) {

                currentView.trigger('closeView');

            }
            var view = new IndicatorListView({
                menus: menus,
                vent: vent
            });
            //$('.tab-pane#indicatorMaintain').html(view.$el);
            $('#home').html(view.$el);
            currentView = view;

            setMenuItemActive($('#mainTab'), $('#settingMenu>a'));
        });




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

        var height = window.innerHeight - $('.navbar').height() - 100;

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
        
        
        var slideTemplate = Handlebars.compile(slideSrc);
        var slideHtml = slideTemplate();

        var $slideHtml = $(slideHtml);
        
        $(".carousel-indicators", $slideHtml).append(slideIndicatorHtml);
        $(".carousel-inner", $slideHtml).append(slideItemHtml);

        // $('.carousel').on('slide.bs.carousel', updateMemo);
        $('.carousel', $slideHtml).carousel({
            interval: interval
        });
        // $('.carousel').on('slid.bs.carousel', updateMemo);

        var memoModel = memos.at(0);
        if (memoModel !== undefined) {
            // updateMemoByModel(memoModel);
        }

        $('.carousel img', $slideHtml).hover(hoverIn, hoverOut);

        $(".carousel .img", $slideHtml).on("dblclick", function(evt) {
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
        
        $('#home').html($slideHtml);

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
        
        
        $('a[href=#home]').on('click', loadMenuItem);

    };

    var menus;
    menus = new MenuCollection();

    menus.fetch({
        data: {
            node: 900
        }
    });


    var vent = new _.extend({}, Backbone.Events);

    var memos = new ReportMemoCollection();
    var indicator = -10;
    
    
    
    var loadSlideItemByIndicatorSet = function(event){
    	
        if (event !== undefined && event.target) {
            indicatorSet = $(event.target).attr('data-indicatorSet-id');
            
               
            
        }else{
        	return;
        }
       
        memos.fetch({

            data: {
                node: 900,
                enabled: true,
                method: "getMemoList",
                indicatorSet: indicatorSet
            },
            success: initSlide
        });


        if(indicatorSet>0){

        	
        	setMenuItemActive($('#mainTab'), $('#indicatorSetMenu>a'));
            

        }

    	
    };

    var loadSlideItem = function(event) {

        

        if (event !== undefined && event.target) {
            newIndicator = $(event.target).attr('data-indicator-id');
            
                
            
        }else{
            newIndicator = 0;
        }
       
        
       
        

         if(newIndicator!=indicator){

            indicator = newIndicator;
         }

        memos.fetch({

            data: {
                node: 900,
                enabled: true,
                method: "getMemoList",
                indicator: indicator
            },
            success: initSlide
        });


        if(indicator>0){

        	
        	setMenuItemActive($('#mainTab'), $('#indicatorMenu>a'));
            //$('#indicatorMenu').addClass('active');
            
            //$('#jumpToSlide').parent('li').removeClass('active');
            //$('a[href=#home]').parent('li').removeClass('active');
            //$('#settingMenu').removeClass('active');
            //$(event.target).parent('li').removeClass('active');
            

        }else{
        	
        	setMenuItemActive($('#mainTab'), $('#mainTab>li>a[href=#sliderTab]'));
        }



    };

    //vent.bind('app:updateSlide', loadSlideItem);
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
            //$('.tab-pane#reportMemoList').html(view.$el);
            $('#home').html(view.$el);
            currentView = view;
            setMenuItemActive($('#mainTab'), $('#settingMenu>a'));

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
            //$('.tab-pane#slideSetting').html(view.$el);
            $('#home').html(view.$el);
            setMenuItemActive($('#mainTab'), $('#settingMenu>a'));

        });

    };
    
    
    

    var updateIndicatorsOptions = function(event) {


        var preMenu = "";
        var level1 = $('#indicatorMenu>ul');
        var level2 = null;


        event.models.forEach(function(value, idx) {



            if (preMenu != value.get('menuText')) {

                if (level2 !== null) {
                    level1.append(level2);

                }
                preMenu = value.get('menuText');


                level2 = $(' <li class="dropdown-submenu"><a href="#"  class="dropdown-toggle" data-toggle="dropdown" >' + value.get('menuText') + '</a><ul class="dropdown-menu"></ul></li>');


            }

            $('ul', level2).append('<li><a href="#sliderTab" data-indicator-id="' + value.get('id') + '">' + value.get('name') + '</a></li>');

        });

        level1.append(level2);

        level1.on('click', 'a[data-indicator-id]', loadSlideItem);

        //$('#indicatorMenu>ul').smartmenus({
        //    hideOnClick:true
        //});




    };

    var updateIndicatorSetsOptions = function(event) {


        var preMenu = "";
        var $level1 = $('#indicatorSetMenu>ul');

        event.models.forEach(function(value, idx) {


            $level1.append('<li><a href="#sliderTab" data-indicatorSet-id="' + value.get('id') + '">' + value.get('name') + '</a></li>');

        });

        

        $level1.on('click', 'a[data-indicatorSet-id]', loadSlideItemByIndicatorSet);

        //$('#indicatorMenu>ul').smartmenus({
        //    hideOnClick:true
        //});




    };


    var loadAllIndicatorsToSelect = function() {




        var indicators = new Indicators();
        indicators.on('sync', updateIndicatorsOptions, indicators);
        indicators.fetch();

        $('#jumpToSlide').on('click', loadSlideItem);
        
        
        var indicatorSets = new IndicatorSets();
        indicatorSets.on('sync', updateIndicatorSetsOptions, indicatorSets);
        indicatorSets.fetch();
        




    };

    loadAllIndicatorsToSelect();
    
    $('#reportMemoLink').on('click', LoadReportMemoList);
    $('a[href=#slideSetting]').on('click', LoadMemoOptions);
    $('a[href=#indicatorMaintain]').on('click', LoadIndicatorList);


    
    //loadMenuItem();
    loadSlideItem();
    initDashboard();


});
