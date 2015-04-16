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

    },


    urlMap: {
        "dashboard.js": "dashboard-089ff55b.js",
        "dashboard_20150417.js": "dashboard_20150417-089ff55b.js",
        "javascript.js": "javascript-bb907479.js",
        "collection/indicators.js": "collection/indicators-d8c6751a.js",
        "collection/indicatorSets.js": "collection/indicatorSets-d39e0674.js",
        "collection/menus.js": "collection/menus-22736c89.js",
        "collection/reportMemos.js": "collection/reportMemos-8a168c56.js",
        "DataMaintain/UserForm.js": "DataMaintain/UserForm-7840fd00.js",
        "DataMaintain/UserGrid.js": "DataMaintain/UserGrid-d1a4a220.js",
        "DataMaintain/writer.js": "DataMaintain/writer-7f21e823.js",
        "ench/bootstrap-table-ench.js": "ench/bootstrap-table-ench-cd67e603.js",
        "ie/html5shiv-printshiv.js": "ie/html5shiv-printshiv-d0d9a764.js",
        "ie/html5shiv-printshiv.min.js": "ie/html5shiv-printshiv.min-8c3c50c9.js",
        "ie/html5shiv.js": "ie/html5shiv-ee68da40.js",
        "ie/html5shiv.min.js": "ie/html5shiv.min-30442341.js",
        "ie/respond.matchmedia.addListener.min.js": "ie/respond.matchmedia.addListener.min-e5192470.js",
        "ie/respond.matchmedia.addListener.src.js": "ie/respond.matchmedia.addListener.src-56c75758.js",
        "ie/respond.min.js": "ie/respond.min-9cccbcd9.js",
        "ie/respond.src.js": "ie/respond.src-e5d7fffb.js",
        "model/indicator.js": "model/indicator-7296c909.js",
        "model/indicatorSet.js": "model/indicatorSet-3d3a2b93.js",
        "model/menu.js": "model/menu-4b3e1ebe.js",
        "model/reportMemo.js": "model/reportMemo-3922d9f1.js",
        "libs/backbone.js": "libs/backbone-9f7946cb.js",
        "libs/backbone.stickit.js": "libs/backbone.stickit-8d657a45.js",
        "libs/backbone.stickit.min.js": "libs/backbone.stickit.min-dd638a9c.js",
        "libs/bootstrap-3.1.0.min.js": "libs/bootstrap-3.1.0.min-af004539.js",
        "libs/bootstrap-3.3.1.min.js": "libs/bootstrap-3.3.1.min-5dcb19db.js",
        "libs/bootstrap-datepicker.js": "libs/bootstrap-datepicker-2b28bee6.js",
        "libs/bootstrap-select.js": "libs/bootstrap-select-28553d93.js",
        "libs/bootstrap-select.min.js": "libs/bootstrap-select.min-f847ab44.js",
        "libs/bootstrap-table.js": "libs/bootstrap-table-d9139884.js",
        "libs/bootstrap-table.min.js": "libs/bootstrap-table.min-5bbab32f.js",
        "libs/bootstrap.js": "libs/bootstrap-9cb05329.js",
        "libs/bootstrap.min.js": "libs/bootstrap.min-8c237312.js",
        "libs/fileinput.js": "libs/fileinput-ab035a97.js",
        "libs/fileinput.min.js": "libs/fileinput.min-af3cb043.js",
        "libs/handlebars-v2.0.0.js": "libs/handlebars-v2.0.0-664baaa4.js",
        "libs/jquery-1.11.1.js": "libs/jquery-1.11.1-3d93b072.js",
        "libs/jquery-1.11.1.min.js": "libs/jquery-1.11.1.min-8101d596.js",
        "libs/jquery-cookie.js": "libs/jquery-cookie-7e6f454c.js",
        "libs/jquery-photo-resize.js": "libs/jquery-photo-resize-3627d2a0.js",
        "libs/jquery.fileDownload.js": "libs/jquery.fileDownload-277cf364.js",
        "libs/jquery.fileupload.js": "libs/jquery.fileupload-f8ea3268.js",
        "libs/jquery.flexslider-min.js": "libs/jquery.flexslider-min-9ec3c315.js",
        "libs/jquery.flexslider.js": "libs/jquery.flexslider-7c38db84.js",
        "libs/jquery.fullscreen.js": "libs/jquery.fullscreen-8535413e.js",
        "libs/jquery.html5-placeholder-shim.js": "libs/jquery.html5-placeholder-shim-bd3d1b51.js",
        "libs/npm.js": "libs/npm-ccb7f390.js",
        "libs/require.js": "libs/require-f1c61e00.js",
        "libs/text.js": "libs/text-b061e680.js",
        "libs/underscore.js": "libs/underscore-698a1e2a.js",
        "template/mark-memo.hbs": "template/mark-memo-88dde631.hbs",
        "template/menu.hbs": "template/menu-75454cfc.hbs",
        "template/menuList.hbs": "template/menuList-17daf417.hbs",
        "template/modal-view.hbs": "template/modal-view-65ddf46b.hbs",
        "template/slide-indicator.hbs": "template/slide-indicator-79edacf7.hbs",
        "template/slide-item.hbs": "template/slide-item-0b342b74.hbs",
        "template/slide.hbs": "template/slide-ca841fd4.hbs",
        "view/MarkMemoView.js": "view/MarkMemoView-4274922a.js",
        "view/ModalMarkMemoView.js": "view/ModalMarkMemoView-6eea59a9.js",
        "libs/i18n/defaults-cs_CZ.js": "libs/i18n/defaults-cs_CZ-89768a64.js",
        "libs/i18n/defaults-cs_CZ.min.js": "libs/i18n/defaults-cs_CZ.min-0ecf9acb.js",
        "libs/i18n/defaults-de_DE.js": "libs/i18n/defaults-de_DE-f195ccdc.js",
        "libs/i18n/defaults-de_DE.min.js": "libs/i18n/defaults-de_DE.min-ccb98dfd.js",
        "libs/i18n/defaults-en_US.js": "libs/i18n/defaults-en_US-4493f65e.js",
        "libs/i18n/defaults-en_US.min.js": "libs/i18n/defaults-en_US.min-899140b2.js",
        "libs/i18n/defaults-es_CL.js": "libs/i18n/defaults-es_CL-b04ed673.js",
        "libs/i18n/defaults-es_CL.min.js": "libs/i18n/defaults-es_CL.min-fa9a35d3.js",
        "libs/i18n/defaults-eu.js": "libs/i18n/defaults-eu-627bacb5.js",
        "libs/i18n/defaults-eu.min.js": "libs/i18n/defaults-eu.min-bce5d26f.js",
        "libs/i18n/defaults-fr_FR.js": "libs/i18n/defaults-fr_FR-f215a2ea.js",
        "libs/i18n/defaults-fr_FR.min.js": "libs/i18n/defaults-fr_FR.min-1747bc13.js",
        "libs/i18n/defaults-it_IT.js": "libs/i18n/defaults-it_IT-420b6217.js",
        "libs/i18n/defaults-it_IT.min.js": "libs/i18n/defaults-it_IT.min-6f4baaab.js",
        "libs/i18n/defaults-nl_NL.js": "libs/i18n/defaults-nl_NL-80bb8d5e.js",
        "libs/i18n/defaults-nl_NL.min.js": "libs/i18n/defaults-nl_NL.min-821ec08f.js",
        "libs/i18n/defaults-pl_PL.js": "libs/i18n/defaults-pl_PL-bce5949a.js",
        "libs/i18n/defaults-pl_PL.min.js": "libs/i18n/defaults-pl_PL.min-c04271eb.js",
        "libs/i18n/defaults-pt_BR.js": "libs/i18n/defaults-pt_BR-3d0faa05.js",
        "libs/i18n/defaults-pt_BR.min.js": "libs/i18n/defaults-pt_BR.min-b8c30438.js",
        "libs/i18n/defaults-ro_RO.js": "libs/i18n/defaults-ro_RO-cecb86f0.js",
        "libs/i18n/defaults-ro_RO.min.js": "libs/i18n/defaults-ro_RO.min-b4ac585d.js",
        "libs/i18n/defaults-ru_RU.js": "libs/i18n/defaults-ru_RU-3bc1512e.js",
        "libs/i18n/defaults-ru_RU.min.js": "libs/i18n/defaults-ru_RU.min-6ad44ff4.js",
        "libs/i18n/defaults-ua_UA.js": "libs/i18n/defaults-ua_UA-356daccb.js",
        "libs/i18n/defaults-ua_UA.min.js": "libs/i18n/defaults-ua_UA.min-36035f77.js",
        "libs/i18n/defaults-zh_CN.js": "libs/i18n/defaults-zh_CN-1c839776.js",
        "libs/i18n/defaults-zh_CN.min.js": "libs/i18n/defaults-zh_CN.min-006cc85b.js",
        "libs/i18n/defaults-zh_TW.js": "libs/i18n/defaults-zh_TW-c1b2910e.js",
        "libs/i18n/defaults-zh_TW.min.js": "libs/i18n/defaults-zh_TW.min-1d1fbc7a.js",
        "libs/locale/bootstrap-table-da-DK.js": "libs/locale/bootstrap-table-da-DK-a26ed1bb.js",
        "libs/locale/bootstrap-table-da-DK.min.js": "libs/locale/bootstrap-table-da-DK.min-5a081a97.js",
        "libs/locale/bootstrap-table-el-GR.js": "libs/locale/bootstrap-table-el-GR-17f82521.js",
        "libs/locale/bootstrap-table-en-US.js": "libs/locale/bootstrap-table-en-US-8a5244be.js",
        "libs/locale/bootstrap-table-en-US.js.template": "libs/locale/bootstrap-table-en-US.js-af5636a2.template",
        "libs/locale/bootstrap-table-en.js": "libs/locale/bootstrap-table-en-ae10aced.js",
        "libs/locale/bootstrap-table-en.js.template": "libs/locale/bootstrap-table-en.js-9b477f07.template",
        "libs/locale/bootstrap-table-en.min.js": "libs/locale/bootstrap-table-en.min-0ce8e374.js",
        "libs/locale/bootstrap-table-es-AR.js": "libs/locale/bootstrap-table-es-AR-102970e1.js",
        "libs/locale/bootstrap-table-es_AR.js": "libs/locale/bootstrap-table-es_AR-87e5f063.js",
        "libs/locale/bootstrap-table-es_AR.min.js": "libs/locale/bootstrap-table-es_AR.min-2308fea9.js",
        "libs/locale/bootstrap-table-fr-BE.js": "libs/locale/bootstrap-table-fr-BE-70406cd3.js",
        "libs/locale/bootstrap-table-fr_BE.js": "libs/locale/bootstrap-table-fr_BE-0b6e7afc.js",
        "libs/locale/bootstrap-table-fr_BE.min.js": "libs/locale/bootstrap-table-fr_BE.min-744e7f22.js",
        "libs/locale/bootstrap-table-it-IT.js": "libs/locale/bootstrap-table-it-IT-06b6c68c.js",
        "libs/locale/bootstrap-table-it-IT.min.js": "libs/locale/bootstrap-table-it-IT.min-118bf227.js",
        "libs/locale/bootstrap-table-nl-NL.js": "libs/locale/bootstrap-table-nl-NL-504279f7.js",
        "libs/locale/bootstrap-table-pt-BR.js": "libs/locale/bootstrap-table-pt-BR-d0ec1753.js",
        "libs/locale/bootstrap-table-pt-BR.min.js": "libs/locale/bootstrap-table-pt-BR.min-f8608316.js",
        "libs/locale/bootstrap-table-ru-RU.js": "libs/locale/bootstrap-table-ru-RU-dea717c0.js",
        "libs/locale/bootstrap-table-ru_RU.js": "libs/locale/bootstrap-table-ru_RU-3d3b47cb.js",
        "libs/locale/bootstrap-table-tr-TR.js": "libs/locale/bootstrap-table-tr-TR-ec6119e4.js",
        "libs/locale/bootstrap-table-tr_TR.js": "libs/locale/bootstrap-table-tr_TR-02f1af7f.js",
        "libs/locale/bootstrap-table-vi-VN.js": "libs/locale/bootstrap-table-vi-VN-448572e7.js",
        "libs/locale/bootstrap-table-vi_VN.js": "libs/locale/bootstrap-table-vi_VN-7d5302ec.js",
        "libs/locale/bootstrap-table-zh-CN.js": "libs/locale/bootstrap-table-zh-CN-c853f8d5.js",
        "libs/locale/bootstrap-table-zh-CN.min.js": "libs/locale/bootstrap-table-zh-CN.min-77d7c502.js",
        "libs/locale/bootstrap-table-zh-TW.js": "libs/locale/bootstrap-table-zh-TW-dedc3bff.js",
        "libs/locale/bootstrap-table-zh-TW.min.js": "libs/locale/bootstrap-table-zh-TW.min-6bc986fc.js",
        "libs/locale/README.md": "libs/locale/README-2501d577.md",
        "template/indicator/edit.hbs": "template/indicator/edit-a3612386.hbs",
        "template/indicator/list.hbs": "template/indicator/list-d22c4cf4.hbs",
        "template/indicator/tool-bar.hbs": "template/indicator/tool-bar-30f8f455.hbs",
        "template/reportMemo/list.hbs": "template/reportMemo/list-5df3aafd.hbs",
        "template/reportMemo/tool-bar.hbs": "template/reportMemo/tool-bar-31a5ef8b.hbs",
        "template/slideSetting/list.hbs": "template/slideSetting/list-30688495.hbs",
        "libs/locales/bootstrap-datepicker.ar.js": "libs/locales/bootstrap-datepicker.ar-c394f59b.js",
        "libs/locales/bootstrap-datepicker.az.js": "libs/locales/bootstrap-datepicker.az-b60d0405.js",
        "libs/locales/bootstrap-datepicker.bg.js": "libs/locales/bootstrap-datepicker.bg-e60dc33e.js",
        "libs/locales/bootstrap-datepicker.ca.js": "libs/locales/bootstrap-datepicker.ca-b652ea76.js",
        "libs/locales/bootstrap-datepicker.cs.js": "libs/locales/bootstrap-datepicker.cs-d51e1ef0.js",
        "libs/locales/bootstrap-datepicker.cy.js": "libs/locales/bootstrap-datepicker.cy-249f0193.js",
        "libs/locales/bootstrap-datepicker.da.js": "libs/locales/bootstrap-datepicker.da-7b153b2b.js",
        "libs/locales/bootstrap-datepicker.de.js": "libs/locales/bootstrap-datepicker.de-68867c7d.js",
        "libs/locales/bootstrap-datepicker.el.js": "libs/locales/bootstrap-datepicker.el-fcfdf91e.js",
        "libs/locales/bootstrap-datepicker.es.js": "libs/locales/bootstrap-datepicker.es-ee171e67.js",
        "libs/locales/bootstrap-datepicker.et.js": "libs/locales/bootstrap-datepicker.et-f9652997.js",
        "libs/locales/bootstrap-datepicker.fa.js": "libs/locales/bootstrap-datepicker.fa-249cd502.js",
        "libs/locales/bootstrap-datepicker.fi.js": "libs/locales/bootstrap-datepicker.fi-eda2a82f.js",
        "libs/locales/bootstrap-datepicker.fr.js": "libs/locales/bootstrap-datepicker.fr-a9e4500f.js",
        "libs/locales/bootstrap-datepicker.gl.js": "libs/locales/bootstrap-datepicker.gl-ad133ad6.js",
        "libs/locales/bootstrap-datepicker.he.js": "libs/locales/bootstrap-datepicker.he-7476419a.js",
        "libs/locales/bootstrap-datepicker.hr.js": "libs/locales/bootstrap-datepicker.hr-4e935639.js",
        "libs/locales/bootstrap-datepicker.hu.js": "libs/locales/bootstrap-datepicker.hu-7f80f4a1.js",
        "libs/locales/bootstrap-datepicker.id.js": "libs/locales/bootstrap-datepicker.id-ad4171b3.js",
        "libs/locales/bootstrap-datepicker.is.js": "libs/locales/bootstrap-datepicker.is-0bcffcd9.js",
        "libs/locales/bootstrap-datepicker.it.js": "libs/locales/bootstrap-datepicker.it-2d55bf49.js",
        "libs/locales/bootstrap-datepicker.ja.js": "libs/locales/bootstrap-datepicker.ja-edc2c85e.js",
        "libs/locales/bootstrap-datepicker.ka.js": "libs/locales/bootstrap-datepicker.ka-2653e51e.js",
        "libs/locales/bootstrap-datepicker.kk.js": "libs/locales/bootstrap-datepicker.kk-6ff423e3.js",
        "libs/locales/bootstrap-datepicker.kr.js": "libs/locales/bootstrap-datepicker.kr-1fe72afc.js",
        "libs/locales/bootstrap-datepicker.lt.js": "libs/locales/bootstrap-datepicker.lt-4c7f87bb.js",
        "libs/locales/bootstrap-datepicker.lv.js": "libs/locales/bootstrap-datepicker.lv-c54e1996.js",
        "libs/locales/bootstrap-datepicker.mk.js": "libs/locales/bootstrap-datepicker.mk-3df03ac0.js",
        "libs/locales/bootstrap-datepicker.ms.js": "libs/locales/bootstrap-datepicker.ms-d31bb70d.js",
        "libs/locales/bootstrap-datepicker.nb.js": "libs/locales/bootstrap-datepicker.nb-003f12d3.js",
        "libs/locales/bootstrap-datepicker.nl-BE.js": "libs/locales/bootstrap-datepicker.nl-BE-e6f53806.js",
        "libs/locales/bootstrap-datepicker.nl.js": "libs/locales/bootstrap-datepicker.nl-f5fe1c76.js",
        "libs/locales/bootstrap-datepicker.no.js": "libs/locales/bootstrap-datepicker.no-19112b6a.js",
        "libs/locales/bootstrap-datepicker.pl.js": "libs/locales/bootstrap-datepicker.pl-dd4533c6.js",
        "libs/locales/bootstrap-datepicker.pt-BR.js": "libs/locales/bootstrap-datepicker.pt-BR-2b702f10.js",
        "libs/locales/bootstrap-datepicker.pt.js": "libs/locales/bootstrap-datepicker.pt-eeaddf93.js",
        "libs/locales/bootstrap-datepicker.ro.js": "libs/locales/bootstrap-datepicker.ro-351aa40d.js",
        "libs/locales/bootstrap-datepicker.rs-latin.js": "libs/locales/bootstrap-datepicker.rs-latin-2a477652.js",
        "libs/locales/bootstrap-datepicker.rs.js": "libs/locales/bootstrap-datepicker.rs-83ccd03a.js",
        "libs/locales/bootstrap-datepicker.ru.js": "libs/locales/bootstrap-datepicker.ru-8abba9b1.js",
        "libs/locales/bootstrap-datepicker.sk.js": "libs/locales/bootstrap-datepicker.sk-f425a563.js",
        "libs/locales/bootstrap-datepicker.sl.js": "libs/locales/bootstrap-datepicker.sl-5d6f3e7b.js",
        "libs/locales/bootstrap-datepicker.sq.js": "libs/locales/bootstrap-datepicker.sq-6c1d7a1e.js",
        "libs/locales/bootstrap-datepicker.sv.js": "libs/locales/bootstrap-datepicker.sv-7665023f.js",
        "libs/locales/bootstrap-datepicker.sw.js": "libs/locales/bootstrap-datepicker.sw-2f01204f.js",
        "libs/locales/bootstrap-datepicker.th.js": "libs/locales/bootstrap-datepicker.th-2ce9201b.js",
        "libs/locales/bootstrap-datepicker.tr.js": "libs/locales/bootstrap-datepicker.tr-5e27962b.js",
        "libs/locales/bootstrap-datepicker.ua.js": "libs/locales/bootstrap-datepicker.ua-3a17d755.js",
        "libs/locales/bootstrap-datepicker.vi.js": "libs/locales/bootstrap-datepicker.vi-ddd41519.js",
        "libs/locales/bootstrap-datepicker.zh-CN.js": "libs/locales/bootstrap-datepicker.zh-CN-70fb6946.js",
        "libs/locales/bootstrap-datepicker.zh-TW.js": "libs/locales/bootstrap-datepicker.zh-TW-7d244784.js",
        "view/indicator/edit.js": "view/indicator/edit-32a4ac32.js",
        "view/indicator/list.js": "view/indicator/list-9d97b679.js",
        "view/reportMemo/list.js": "view/reportMemo/list-b70c1148.js",
        "view/slideSetting/list.js": "view/slideSetting/list-64dbae4c.js",
        "libs/bootstrap-select.js.map": "libs/bootstrap-select.js-2364340c.map"
    },

    urlArgs: function(moduleName, url) {

        var config = this;

        var element = url.slice((config.baseUrl).length);
        if (config.urlMap[element] != undefined) {


            return config.urlMap[element];
        } else {
            return url;
        }



    }


});

require(['text!template/menu.hbs', 'text!template/slide-indicator.hbs',
    'text!template/slide-item.hbs', 'text!template/slide.hbs', 'collection/indicators', 'jquery', 'bootstrap',
    'handlebars', 'collection/menus',
    'collection/reportMemos', 'collection/indicatorSets', 'backbone', 'jquery-cookie',
    'jquery-fullscreen'
], function(menuSrc, slideIndicatorSrc,
    slideItemSrc, slideSrc, Indicators, jquery, bootstrap, Handlebars, MenuCollection,
    ReportMemoCollection, IndicatorSets, Backbone) {
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

    var setMenuItemActive = function($ul, $el) {


        $ul.children('li').removeClass('active');
        $el.parent('li').addClass('active');


    };

    $(window).ready(function() {
        /*
        
             * Scroll the window to avoid the topnav bar
             * https://github.com/twitter/bootstrap/issues/1768
             */
        if ($(".navbar-default.navbar-fixed-top").length > 0) {
            // var navHeight = $(".navbar").height(),
            var navHeight = 40,
                shiftWindow = function() {
                    scrollBy(0, -navHeight - 10);
                };

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



    var loadSlideItemByIndicatorSet = function(event) {

        if (event !== undefined && event.target) {
            indicatorSet = $(event.target).attr('data-indicatorSet-id');



        } else {
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


        if (indicatorSet > 0) {


            setMenuItemActive($('#mainTab'), $('#indicatorSetMenu>a'));


        }


    };

    var loadSlideItem = function(event) {



        if (event !== undefined && event.target) {
            newIndicator = $(event.target).attr('data-indicator-id');



        } else {
            newIndicator = 0;
        }





        if (newIndicator != indicator) {

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


        if (indicator > 0) {


            setMenuItemActive($('#mainTab'), $('#indicatorMenu>a'));
            //$('#indicatorMenu').addClass('active');

            //$('#jumpToSlide').parent('li').removeClass('active');
            //$('a[href=#home]').parent('li').removeClass('active');
            //$('#settingMenu').removeClass('active');
            //$(event.target).parent('li').removeClass('active');


        } else {

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
