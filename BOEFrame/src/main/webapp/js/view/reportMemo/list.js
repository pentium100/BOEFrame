define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/reportMemo/list.hbs', 'view/ModalMarkMemoView',
    'collection/reportMemos', 'text!template/reportMemo/tool-bar.hbs',
    'collection/indicators', 'collection/indicatorSets',
    'bootstrap-table', 'bootstrap-datepicker.zh-cn', 'bootstrap-table-ench','bootstrap-select'
], function(
    Backbone, _, Handlebars, $, reportMemoListTemplate,
    ModalMarkMemoView, ReportMemoCollection, ToolbarTemplate, IndicatorCollection, IndicatorSetCollection, BootstrapTable) {

    var ReportMemoList = Backbone.View.extend({

        template: Handlebars.compile(reportMemoListTemplate),

        initialize: function(options) {

            this.collection = new ReportMemoCollection();
            this.indicatorCollection = new IndicatorCollection();
            this.indicatorSetCollection = new IndicatorSetCollection();
            this.listenTo(this.collection, 'sync', this.render);
            this.menuCollection = options.menus;
            this.options = options;
            
            this.render();
            this.listenTo(this, 'closeView', this.close);
            
            
            this.listenTo(this.indicatorSetCollection, 'sync', this.updateIndicatorSetOption);
            this.listenTo(this.indicatorCollection, 'sync', this.updateIndicatorOption)
            
            // this.collection.fetch({
            // data : {
            // node : 900,

            // method : "getMemoList"
            // }
            // });  
        },
        events: {
            'dbl-click-row.bs.table table': 'editMemo',
            'click button#newReportMemo': 'newMemo',
            'change #searchIndicatorSet': 'searchIndicatorSetChange',
            'change #searchIndicator': 'refreshData',
            'change #searchPeriod': 'refreshData'
            
    		

        },
        
        
        refreshData: function(e){
        	$('table', this.el).bootstrapTable('refresh');
        	
        	
        }, 
        
        updateIndicatorOption: function(items){
        	

            $('#searchIndicator', this.el).empty();
    		$('#searchIndicator', this.el).append($('<option>', { 
		        value: 0,
		        text : '全部指标' 
		    }));
    		$.each(items.models, function (i, item) {
    			$('#searchIndicator', this.el).append($('<option>', { 
    		        value: item.get('id'),
    		        text : item.get('name') 
    		    }));
    		});
    		$('#searchIndicator', this.el).selectpicker('refresh');
    		
        	
        	
        }, 
        searchIndicatorSetChange: function(e){
        	
        	this.indicatorCollection.fetch({
        		data:{
        			indicatorSet: $(e.target).selectpicker('val')
        			
        		}
        		
        	});

            this.refreshData();
        	
        	
        },


        close: function() {


            this.remove();
            this.unbind();
            delete this.template;
            delete this.collection;
            delete this.menuCollection;


        },

        updateIndicatorSetOption:function(collection){
        	

            $('#searchIndicatorSet', this.el).empty();
        	$('#searchIndicatorSet', this.el).append($('<option>', { 
		        value: 0,
		        text : '全部指标集' 
		    }));
    		$.each(collection.models, function (i, item) {
    			$('#searchIndicatorSet', this.el).append($('<option>', { 
    		        value: item.get('id'),
    		        text : item.get('name') 
    		    }));
    		});
        	
        	$('#searchIndicatorSet', this.el).selectpicker('refresh');
            
        },

        newMemo: function(event) {


            var modalId = _.uniqueId("modal_");

            this.model = new Backbone.Model({

                keyDate: $().datepicker.DPGlobal.formatDate(new Date(), 'yyyy/mm/dd', 'en'),
                keyValue: 0,
                isEnabled: true,
                indicator: 0
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
            self.options.vent.trigger('app:updateSlide');

        },

        render: function() {

            // this.markMemoView.render();
            var $content = this.template(this.collection);
            $(this.el).html($content);
            var view = this;
            
            this.indicatorSetCollection.fetch();
         
            
            this.indicatorCollection.fetch();
            //$('#custem-toolbar', view.el).html(Handlebars.compile(ToolbarTemplate)());
            
    		$('#searchIndicatorSet', this.el).selectpicker();
            
            $('table', this.el).bootstrapTable({
                queryParams: this.queryParams,
                parentView: this.el,

                toolbar: ToolbarTemplate,

                columns: [

                    {
                        field: "keyDate",
                        'class': "col-md-1",
                        title: "注释",
                        formatter: this.formatKeyDate

                    }, {
                        field: "menuText",
                        'class': "col-md-2",
                        title: "指标名称"
                    }, {
                        field: "id",
                        'class': "col-md-2",
                        title: "指标快照",
                        formatter: this.formatSnapShot
                    }, {
                        field: "memo",
                        'class': "col-md-6",
                        title: "说明信息",

                        cellStyle: this.formatMemo
                    }

                ]


            });

            
            $('#searchPeriod', view.el).datepicker({
                format: "yyyy-mm",
                minViewMode: 1,
                language: "zh-CN",
                autoclose: true,
                clearBtn: true
            });
            
            


        },

        formatKeyDate: function(value, row) {

            var isShow = row.isEnabled ? '显示' : '不显示';

            return row.memoBy + '<br>' + row.keyDate + '<br>' + isShow + '<br>' + row.period;
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
            self.options.vent.trigger('app:updateSlide');
        },

        queryParams: function(options) {

            return {

                start: options.offset,
                limit: options.limit,
                searchToken: options.search,
                forEdit: true,
                indicator : $('#searchIndicator', this.parentView).val()>0?$('#searchIndicator', this.parentView).val():null,
                period : $('#searchPeriod', this.parentView).val(),
                indicatorSet: $('#searchIndicatorSet', this.parentView).val()>0?$('#searchIndicatorSet', this.parentView).val():null
            };

        }

    });

    return ReportMemoList;

});
