define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/indicator/edit.hbs', 
    'backbone.stickit', 'bootstrap-select'
], function(Backbone, _,
    Handlebars, $, editTemplate) {

    var EditView = Backbone.View.extend({

        // modalTemplate :
        // Handlebars.compile(modalViewTemplate),
        template: Handlebars.compile(editTemplate),



        className: "modal fade bs-example-modal-lg",

        attributes: function() {
            return {

                "tabindex": "-1",
                "role": "dialog",
                "aria-hidden": "true",
                "style": "z-index: 1050"

            };
        },

        bindings: {
            '#indicatorName': 'name',
            '#id': 'id',
            'select#menu': {
                observe: 'menu',
                selectOptions: {
                    // Alternatively, `this` can be used to reference anything in the view's scope.
                    // For example: `collection:'this.stooges'` would reference `view.stooges`.
                    collection: 'this.menus',
                    labelPath: 'text',
                    valuePath: 'id',
                    defaultOption: {
                        label: "Choose one...",
                        value: null
                    }
                },
                onGet: 'formatKeyValue'

            },
            'select#indicatorSet': {
                observe: 'indicatorSet',
                selectOptions: {
                    // Alternatively, `this` can be used to reference anything in the view's scope.
                    // For example: `collection:'this.stooges'` would reference `view.stooges`.
                    collection: 'this.indicatorSets',
                    labelPath: 'name',
                    valuePath: 'id',
                    defaultOption: {
                        label: "Choose one...",
                        value: null
                    }
                }
                //,onGet: 'formatKeyValue'

            }

        },
        events: {
            'submit form': 'submitForm',
            'click button[action=delete]': 'deleteIndicator',
            'click button[action=cancel]': 'cancelIndicator'
        },


        cancelIndicator: function(event) {


            this.vents.trigger('closeModalView',
                this);


        },
        formatKeyValue: function(value, options) {
            return parseInt(value);
        },

        deleteIndicator: function(event) {


            event.preventDefault();
            var self = this;
            var form = event.target;


            var formData = new FormData(form);



            $.ajax({
                url: 'indicators.do',
                type: 'POST',
                data: {
                    'id': this.model.get('id'),
                    'method':'delete'

                },
                async: false,
                success: function(data) {
                    var res = $.parseJSON(data);
                    this.model.set('recStatus', 'deleted');


                    if (res.result == "success") {
                        self.vents.trigger('closeModalView',
                            this);
                    }
                },
                context: this
            });

            return false;


        },

        title: '指标维护',

        initialize: function(options) {


            this.menus = options.menus;
            this.indicatorSets = options.indicatorSets;

            this.render();

            
            this.vents = _.extend({}, Backbone.Events);

            this.vents.on('closeModalView',
                this.closeModalView, this);

        },


        closeModalView: function() {

            this.$el.modal('hide');

        },

        loadMarkMemoView: function(data) {

        },
        render: function(data) {


            var model = this.model.attributes;
            var $content = this.template(model);

            $(this.el).html($content);



            this.stickit();
            if (this.model.get('id') === undefined) {
                this.$('button[action=delete]').attr('disabled', "true");

            }

            this.$('.selectpicker').selectpicker();
            return this;

        },





        submitForm: function(event, data) {

            event.preventDefault();
            var self = this;
            var form = event.target;




            var isNew = (this.model.get("id") === undefined || this.model.get("id") === 0);
            if ($('#indicatorName', form).val() === "") {

                this.$('#indicatorName').addClass('has-error');
                return;
            }
            this.$('#indicatorName').removeClass('has-error');

            if ($('#menu', form).val() === "") {

                this.$('#menu').addClass('has-error');
                return;
            }
            this.$('#menu').removeClass('has-error');



            $.ajax({
                url: 'indicators.do',
                type: 'POST',
                data: {
                    'id': this.model.get('id'),
                    'name': this.model.get('name'),
                    'menu': this.model.get('menu'),
                    'indicatorSet': this.model.get('indicatorSet')
                },
                //async: false,
                success: function(data) {
                    var res = $.parseJSON(data);
                    this.model.set("id", res.data.id);

                    if (isNew) {
                        this.model.set('recStatus', 'inserted');
                    } else {
                        this.model.set('recStatus', 'updated');

                    }

                    var menu = this.menus.get(this.model.get('menu'));
                    if (menu !== undefined) {
                        this.model.set('menuText', menu.get('text'));
                        this.model.set('menu', menu.get('id'));
                    }


                    if (res.result == "success") {
                        self.vents.trigger('closeModalView',
                            this);
                    }
                },
                context: this,
                //cache: false
                //contentType: false,
                //processData: false
            });

            return false;


        }

    });

    return EditView;

});
