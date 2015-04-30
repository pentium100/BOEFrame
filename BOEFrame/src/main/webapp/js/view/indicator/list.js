define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/indicator/list.hbs',
    'collection/indicators', 'model/indicator', 'view/indicator/edit', 'text!template/indicator/tool-bar.hbs',
    'collection/indicatorSets',
    'bootstrap-table', 'bootstrap-datepicker', 'bootstrap-table-ench'
], function(
    Backbone, _, Handlebars, $, IndicatorListTemplate,
    IndicatorCollection, IndicatorModel, EditView, ToolbarTemplate, IndicatorSets, BootstrapTable) {

    var IndicatorList = Backbone.View.extend({

        template: Handlebars.compile(IndicatorListTemplate),


        initialize: function(options) {

            this.collection = new IndicatorCollection();
            this.listenTo(this.collection, 'sync', this.render);
            this.options = options;
            this.menuCollection = options.menus;
            
            this.indicatorSets = new IndicatorSets();
            this.indicatorSets.fetch();
            this.render();
            this.listenTo(this, 'closeView', this.close);
            //$('#modals').append(ToolbarTemplate);

            //this.toolbarTemplate = Handlebars.compile(ToolbarTemplate);

        },

        close: function() {

            this.remove();
            this.unbind();
            delete this.template;
            delete this.collection;
            delete this.menuCollection;
            delete this.indicatorSets;


        },

        events: {
            'dbl-click-row.bs.table table': 'editIndicator',
            'click button#newIndicator': 'newIndicator'
        },

        newIndicator: function(event) {


            var modalId = _.uniqueId("modal_");
            this.model = new IndicatorModel({

                canRedirect: true
            });
            var editView = new EditView({

                model: this.model,
                root: '#modals',
                menus: this.menuCollection,
                indicatorSets: this.indicatorSets,
                attributes: {
                    id: modalId
                }

            });




            editView.render();

            $('#modals').append(editView.$el);
            $('#' + modalId).modal('show');
            $('#' + modalId).on('hidden.bs.modal', '', {
                'view': this
            }, this.updateList);




        },

        updateList: function(e) {

            var $element = e.data.$element;
            var self = e.data.view;

            if (self.model.get('recStatus') == 'inserted') {
                self.$('table#indicatorList').bootstrapTable('append', {
                    row: self.model.attributes,
                    position: 0
                });
            }
            if (self.model.get('recStatus') == 'deleted') {

                self.$('table#indicatorList').bootstrapTable('remove', {
                    field: 'id',
                    values: [self.model.id]
                });

            }

            if (self.model.get('recStatus') == 'updated') {
                self.$('table#indicatorList').bootstrapTable('updateRow', {
                    index: $element.prop('rowIndex') - 1,
                    row: self.model.attributes
                });
            }


        },

        editIndicator: function(event, row, $element) {


            var modalId = _.uniqueId("modal_");
            this.model = new Backbone.Model(row);

            var view = new EditView({
                model: this.model,
                menus: this.menuCollection,
                indicatorSets: this.indicatorSets,
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
            }, this.updateList);







        },

        render: function() {


            var $content = this.template(this.collection);

            $(this.el).html($content);
            //$('#custem-toolbar', this.el).html();




            $('table', this.el).bootstrapTable({


                toolbar: ToolbarTemplate



            });


        }






    });


    return IndicatorList;
});
