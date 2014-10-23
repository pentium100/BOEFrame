define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/slideSetting/list.hbs',
    'collection/reportMemos',
    'bootstrap-table', 'bootstrap-table-ench', 'jquery-cookie'
], function(
    Backbone, _, Handlebars, $, slideSettingTemplate,
    ReportMemoCollection, BootstrapTable) {

    var SlideSettingView = Backbone.View.extend({

        template: Handlebars.compile(slideSettingTemplate),
        intervalCookieName: 'interval',
        memoIdsCookieName: 'menoIds',
        memoIdsCookieName2: 'menoIds2',
        events: {

            'click button[data-action=save]': 'saveChanges',
            'click button[data-action=reset]': 'resetSetting'
        },


        resetSetting: function() {


            $.removeCookie(this.intervalCookieName);

            $.removeCookie(this.memoIdsCookieName);
            $.removeCookie(this.memoIdsCookieName2);

            //this.close();
            this.render();


        },


        alertSuccess: function() {


            var html = '<div class="alert alert-success" id="success-alert" data-dismiss="alert">';
            html += '<button type="button" class="close" data-dismiss="alert">x</button>';
            html += '<strong>成功!</strong>';
            html += '您的设置已成功保存！';
            html += '</div>';

            $('.container', this.$el).before(html);


            $(".alert.alert-success", this.$el).fadeTo(2000, 500).slideUp(500, function() {
                $(".alert.alert-success", this.$el).alert('close');
            });


        },

        saveChanges: function() {


            var interval = this.$('input[name=interval]').val();
            if (interval !== undefined) {
                $.cookie(this.intervalCookieName, interval, {
                    expires: 3650
                });
            }

            var rows = this.$('table').bootstrapTable('getData');
            var arrayIds = $.cookie(this.memoIdsCookieName);

            var ids = [];

            if (arrayIds !== undefined) {

                ids = arrayIds.split(',');

            }

            arrayIds = $.cookie(this.memoIdsCookieName2);


            var ids2 = [];

            if (arrayIds !== undefined) {

                ids2 = arrayIds.split(',');

            }



            for (var i = rows.length - 1; i >= 0; i--) {
                if (rows[i].show) {

                    if (ids.indexOf(rows[i].id) < 0) {
                        ids.push(rows[i].id);
                    }


                    var idx = ids2.indexOf(rows[i].id);
                    if (idx >= 0) {
                        ids2.splice(idx, 1);
                    }

                } else {

                    var idx = ids.indexOf(rows[i].id);
                    if (idx >= 0) {

                        ids.splice(idx, 1);


                    }
                    if (ids2.indexOf(rows[i].id) < 0) {
                        ids2.push(rows[i].id);
                    }





                }
            }

            $.cookie(this.memoIdsCookieName, ids.join(','), {
                expires: 3650
            });

            $.cookie(this.memoIdsCookieName2, ids2.join(','), {
                expires: 3650
            });

            //$('.alert.alert-success', this.$el).alert();
            //$(".alert.alert-success", this.$el).fadeTo(2000, 500).slideUp(500, function() {
            //    $(".alert.alert-success", this.$el).alert('close');
            //});

            this.alertSuccess();
            this.options.vent.trigger('app:updateSlide');



        },

        initialize: function(options) {

            this.collection = new ReportMemoCollection();
            this.listenTo(this.collection, 'sync', this.render);
            this.menuCollection = options.menus;
            this.options = options;
            this.render();
            this.listenTo(this, 'closeView', this.close);
        },


        close: function() {


            this.remove();
            this.unbind();
            delete this.template;
            delete this.collection;


        },

        render: function() {


            var interval = $.cookie(this.intervalCookieName);
            if (interval === undefined) {
                interval = 10;
            }

            var $content = this.template({
                interval: interval
            });
            $(this.el).html($content);
            $(".alert.alert-success", this.$el).alert('close');
            $('table', this.$el).bootstrapTable({
                queryParams: this.queryParams,

                columns: [

                    {
                        checkbox: true,
                        title: '显示',
                        field: 'show'
                    },

                    {
                        field: "keyDate",
                        class: "col-md-1",
                        title: "注释",
                        formatter: this.formatKeyDate

                    }, {
                        field: "menuText",
                        class: "col-md-2",
                        title: "指标名称"
                    }, {
                        field: "id",
                        class: "col-md-2",
                        title: "指标快照",
                        formatter: this.formatSnapShot,
                    }, {
                        field: "memo",
                        class: "col-md-6",
                        title: "说明信息",

                        cellStyle: this.formatMemo,
                    }

                ]

            }).on('load-success.bs.table', this, this.updateCheckStatus);
        },

        updateCheckStatus: function(event, rows) {


            var self = event.data;

            var ids = $.cookie(self.memoIdsCookieName);

            if (ids !== undefined) {
                memoIds = ids.split(',');
                for (var i = rows.length - 1; i >= 0; i--) {
                    if (ids.indexOf(rows[i].id) >= 0) {
                        rows[i].show = true;
                    }
                }
            } else {
                for (var i = rows.length - 1; i >= 0; i--) {
                    rows[i].show = true;
                }
            }

            $('table', self.$el).bootstrapTable('load', rows);




        },


        formatKeyDate: function(value, row) {

            var isShow = row.isEnabled ? '显示' : '不显示';

            return row.memoBy + '<br>' + row.keyDate + '<br>' + isShow;
        },

        formatSnapShot: function(value) {


            return '<img src="reportMemo.do?method=getImage&reportMemoId=' + value + '" class="file-preview-image">';

        },

        formatMemo: function(value) {

            //return ' <pre>'+value+'</pre>';
            //return value;

            return {
                css: {
                    'white-space': 'pre-line'
                }

            };

        },


        queryParams: function(options) {

            return {

                start: options.offset,
                limit: options.limit,
                searchToken: options.search
            };

        }



    });

    return SlideSettingView;
});
