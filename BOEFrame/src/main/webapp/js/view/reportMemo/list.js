define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/reportMemo/list.hbs', 'view/ModalMarkMemoView',
    'collection/reportMemos', 'text!template/reportMemo/tool-bar.hbs',
    'bootstrap-table', 'bootstrap-datepicker', 'bootstrap-table-ench'
], function(
    Backbone, _, Handlebars, $, reportMemoListTemplate,
    ModalMarkMemoView, ReportMemoCollection, ToolbarTemplate, BootstrapTable) {

    var ReportMemoList = Backbone.View.extend({

        template: Handlebars.compile(reportMemoListTemplate),

        initialize: function(options) {

            this.collection = new ReportMemoCollection();
            this.listenTo(this.collection, 'sync', this.render);
            this.menuCollection = options.menus;
            this.render();
            // this.collection.fetch({
            // data : {
            // node : 900,

            // method : "getMemoList"
            // }
            // });  
        },
        events: {
            'dbl-click-row.bs.table table': 'editMemo',
            'click button#newReportMemo': 'newMemo'

            // 'hidden.bs.modal div' : 'updateRow'
        },

        newMemo: function(event) {


            var modalId = _.uniqueId("modal_");

            this.model = new Backbone.Model({

                keyDate: $().datepicker.DPGlobal.formatDate(new Date(), 'yyyy/mm/dd', 'en'),
                isEnabled: true
            });

            var view = new ModalMarkMemoView({
                model: this.model,
                root: '#modals',
                menus: this.menuCollection,
                attributes: {
                    id: modalId
                }
            });

            view.render();

            $('#modals').append(view.$el);
            $('#' + modalId).modal('show');
            $('#' + modalId).on('hidden.bs.modal', '', {
                'view': this
            }, this.appendRow);




        },

        appendRow: function(e) {


            var self = e.data.view;

            if (self.model.get('recStatus') == 'inserted') {
                self.$('table#reportMemoList').bootstrapTable('append', {
                    row: self.model.attributes,
                    position: 0
                });
            }

        },

        render: function() {

            // this.markMemoView.render();
            var $content = this.template(this.collection);
            $(this.el).html($content);
            $('#custem-toolbar').html(Handlebars.compile(ToolbarTemplate)());
            $('table', this.el).bootstrapTable({
                queryParams: this.queryParams,

                toolbar: "#custem-toolbar",

                columns: [

                    {
                        field: "keyDate",
                        class: "col-md-1",
                        title: "注释日期"
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
                    }, {
                        field: "memoBy",
                        class: "col-md-1",
                        title: "创建人"

                        
                    }

                ]


            });

            // this.$('table').on('dbl-click-row.bs.table',
            // this.editMemo);
            // $('table', this.el).bootstrapTable('load',
            // this.collection.models);

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

        editMemo: function(e, row, $element) {

            var modalId = _.uniqueId("modal_");
            // var selectedId = $('.x-view-selected')
            // .attr('data-id');

            // var menuModel =
            // menus.get(parseInt(selectedId)).attributes;
            this.model = new Backbone.Model(row);

            var view = new ModalMarkMemoView({
                model: this.model,
                menus: this.menuCollection,
                root: '#modals',
                attributes: {
                    id: modalId
                }
            });

            view.render();

            $('#modals').append(view.$el);
            $('#' + modalId).modal('show');
            $('#' + modalId).on('hidden.bs.modal', '', {
                '$element': $element,
                'view': this
            }, this.updateRow);

        },

        updateRow: function(e) {

            var $element = e.data.$element;
            var self = e.data.view;

            if (self.model.get('recStatus') == 'deleted') {

                self.$('table#reportMemoList').bootstrapTable('remove', {
                    field: 'id',
                    values: [self.model.id]
                });

            }

            if (self.model.get('recStatus') == 'updated') {
                self.$('table#reportMemoList').bootstrapTable('updateRow', {
                    index: $element.prop('rowIndex') - 1,
                    row: self.model.attributes
                });
            }
        },

        queryParams: function(options) {

            return {

                start: options.offset,
                limit: options.limit
            };

        }

    });

    return ReportMemoList;

});
