define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/mark-memo.hbs', 'collection/indicators', 'bootstrap-datepicker.zh-cn',
    'fileinput', 'backbone.stickit', 'bootstrap-select', 'jquery.fileDownload'
], function(Backbone, _,
    Handlebars, $, markMemoTemplate, Indicators) {

    var MarkMemoView = Backbone.View.extend({

        // modalTemplate :
        // Handlebars.compile(modalViewTemplate),
        template: Handlebars.compile(markMemoTemplate),

        bindings: {
            '#indicatorName': 'menuText',
            '#keyDate': 'keyDate',
            '#isEnabled': 'isEnabled',
            '#period': 'period',
            '#id': 'id',
            '#indicatorMemo': 'memo',

            'select#menuId': {
                observe: 'keyValue',
                selectOptions: {
                    // Alternatively, `this` can be used to reference anything in the view's scope.
                    // For example: `collection:'this.stooges'` would reference `view.stooges`.
                    collection: 'this.menus',
                    labelPath: 'text',
                    valuePath: 'id'
                },
                onGet: 'formatKeyValue',
                onSet: 'updateIndicatorList',

            },

            'select#indicator': {
                observe: 'indicator',
                selectOptions: {
                    // Alternatively, `this` can be used to reference anything in the view's scope.
                    // For example: `collection:'this.stooges'` would reference `view.stooges`.
                    collection: 'this.indicators',
                    labelPath: 'name',
                    valuePath: 'id'
                }

            }
        },
        events: {
            'submit form': 'submitForm',
            'click button[action=delete]': 'deleteMemo',
            'click button[action=cancel]': 'cancelMemo',
            'dblclick .file-preview-text[data-postscript-id]': 'downloadPostscript',
            'fileclear input[type=file][id=postscriptFiles]': 'clearInitialPreview'
        },


        updateIndicatorList: function(val, options) {


            this.indicators.fetch({
                data: {
                    menu: val
                }
            });

            return val;


        },

        downloadPostscript: function(event) {



            var postscriptId = $(event.currentTarget).attr('data-postscript-id');

            $.fileDownload('reportMemo.do?method=getPostscript&id=' + postscriptId);




        },

        cancelMemo: function(event) {


            this.vents.trigger('closeModalView',
                this);


        },
        formatKeyValue: function(value, options) {
            return parseInt(value);
        },

        deleteMemo: function(event) {


            event.preventDefault();
            var self = this;
            var form = event.target;


            var formData = new FormData(form);

            this.$('method').val('deleteMemo');

            $.ajax({
                url: 'reportMemo.do',
                type: 'POST',
                data: {
                    'id': this.model.get('id'),
                    'method': 'deleteMemo'
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
                    //cache: false,
                    //contentType: false,
                    //processData: false
            });

            return false;


        },

        title: '注释指标填写',

        initialize: function(options) {

            // $.ajax({
            // url : 'reportMemo.do',
            // data : {
            // method : 'getLastMemo',
            // keyValue : this.model.get("menuId")
            // },
            // success : this.loadMarkMemoView,
            // context : this
            // });
            this.menus = options.menus;
            this.indicators = new Indicators();
            this.listenTo(this.indicators, 'sync', this.render);
            this.indicators.fetch({
                data: {
                    menu: this.model.get('keyValue')
                }
            });



            this.vents = _.extend({}, Backbone.Events);
        },

        loadMarkMemoView: function(data) {

        },
        render: function(data) {


            var model = this.model.attributes;
            //model = _.extend(model, {
            //   menus: this.menus.toJSON()
            //});
            var $content = this.template(model);

            $(this.el).html($content);

            $('.input-group.date', this.el).datepicker({
                format: "yyyy/mm/dd",
                autoclose: true,
                language: "zh-CN",
                todayHighlight: true
            });
            
            
            $('#period', this.el).datepicker({
                format: "yyyy-mm",
                minViewMode: 1,
                language: "zh-CN",
                autoclose: true,
                clearBtn: true
            });
            
            $('#period', this.el).datepicker('update', model.period);



            var initialPreview = [];

            if (model.id !== undefined) {

                initialPreview.push('<img src="reportMemo.do?method=getImage&reportMemoId=' + this.model.get("id") + '" class="file-preview-image">');
            }
            $('input[type=file][id=picFile]', this.el).fileinput({
                showUpload: false,

                allowedFileTypes: ["image"],
                allowedFileExtensions: ["jpg", "gif", "png"],
                maxFileCount: 1,

                initialPreview: initialPreview

            });


            var postscriptPreview = [];


            if (model.postscripts && model.postscripts.length > 0) {
                $.each(model.postscripts, function() {

                    postscriptPreview.push("<div class='file-preview-text' data-postscript-id='" + this.id + "'>" +
                        "<h2><i class='glyphicon glyphicon-file'></i></h2>" +
                        this.fileName + "</div>"
                    );
                });
            }




            $('input[type=file][id=postscriptFiles]', this.el).fileinput({
                showUpload: false,
                overwriteInitial: false,

                maxFileCount: 100,
                allowedPreviewMimeTypes: ['image'],
                initialPreview: postscriptPreview



            });







            // $('form', this.el).submit(this, this.submitForm);
            this.stickit();
            if (this.model.get('id') === undefined) {
                this.$('button[action=delete]').attr('disabled', "true");

            }

            this.$('.selectpicker').selectpicker();
            return this;

        },


        clearInitialPreview: function(event) {



            var $fileinput = $('input[type=file][id=postscriptFiles]', this.el);


            var fileinput = $fileinput.data('fileinput');
            fileinput.overwriteInitial = true;
            $('input[name=clearPostscript]', this.el).val('true');




        },


        checkIsNotNull:function(field, element){


            if (field === undefined || field === 0 || field === "") {


                element.closest('div.form-group').addClass('has-error');
                return false;

            } else {

                element.closest('div.form-group').removeClass('has-error');
                return true;
            }



        },

        submitForm: function(event, data) {

            event.preventDefault();
            var self = this;
            var form = event.target;
            // form.submit();





            if(!this.checkIsNotNull(this.model.get('indicator'), this.$('#indicator')))return;
            if(!this.checkIsNotNull(this.model.get('period'), this.$('#period')))return;
            //if (this.model.get('indicator') === undefined || this.model.get('indicator') === 0) {


             //   this.$('#indicator').parent('div.form-group').addClass('has-error');

            //} else {

            //    this.$('#indicator').parent('div.form-group').removeClass('has-error');
            //}

            if (($('#picFile', form).data('fileinput').initialPreviewCount < 1) && ($('#picFile', form).data('fileinput').$element
                    .prop("files").length < 1)) {

                this.$('#picFile').data('fileinput').showError(
                    '请指定一个指标图片文件！', null, null, null);
                return;

            }






            var isNew = (this.model.get("id") === undefined);
            if ($('#indicatorMemo', form).val() === "") {

                this.$('#indicatorMemo').addClass('has-error');
                return;
            }
            this.$('#indicatorMemo').removeClass('has-error');
            this.$('#picFile').removeClass('has-error');
            var formData = new FormData(form);

            $.ajax({
                url: 'reportMemo.do',
                type: 'POST',
                data: formData,
                async: false,
                success: function(data) {
                    var res = $.parseJSON(data);
                    this.model.set("id", res.data.id);
                    this.model.set("memoBy", res.data.memoBy);
                    

                    if (isNew) {
                        this.model.set('recStatus', 'inserted');
                    } else {
                        this.model.set('recStatus', 'updated');

                    }


                    this.model.attributes.postscripts = res.data.postscripts;


                    var menu = this.menus.get(this.model.get('keyValue'));
                    if (menu !== undefined) {
                        this.model.set('menuText', menu.get('text'));
                    }

                    if (res.result == "success") {
                        self.vents.trigger('closeModalView',
                            this);
                    }
                },
                context: this,
                cache: false,
                contentType: false,
                processData: false
            });

            return false;


        }

    });

    return MarkMemoView;

});
