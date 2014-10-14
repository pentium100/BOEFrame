define(['backbone', 'underscore', 'handlebars', 'jquery',
    'text!template/mark-memo.hbs', 'bootstrap-datepicker',
    'fileinput', 'backbone.stickit', 'bootstrap-select'
], function(Backbone, _,
    Handlebars, $, markMemoTemplate) {

    var MarkMemoView = Backbone.View.extend({

        // modalTemplate :
        // Handlebars.compile(modalViewTemplate),
        template: Handlebars.compile(markMemoTemplate),

        bindings: {
            '#indicatorName': 'menuText',
            '#keyDate': 'keyDate',
            '#isEnabled': 'isEnabled',
            //'#keyValue': 'keyValue',
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
                onGet: 'formatKeyValue'

            }
        },
        events: {
            'submit form': 'submitForm',
            'click button[action=delete]': 'deleteMemo',
            'click button[action=cancel]': 'cancelMemo'
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

            this.render();
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
                todayHighlight: true
            });



            var initialPreview = [];

            if (model.id !== undefined) {

                initialPreview.push('<img src="reportMemo.do?method=getImage&reportMemoId=' + this.model.get("id") + '" class="file-preview-image">');
            }
            $('input[type=file]', this.el).fileinput({
                showUpload: false,

                allowedFileTypes: ["image"],
                allowedFileExtensions: ["jpg", "gif", "png"],
                maxFileCount: 1,

                initialPreview: initialPreview

            });



            // $('form', this.el).submit(this, this.submitForm);
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
            // form.submit();

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

                    if(isNew){
                        this.model.set('recStatus', 'inserted');
                    }else{
                        this.model.set('recStatus', 'updated');
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

            // var formData = $form.serialize();
            // formData = formData + "&method=addMemo";

            // $.each($('#picFile', $form)[0].files,
            // function(key,
            // value) {
            // formData = formData + '&filenames[]='
            // + value;
            // });
            // $.ajax({

            // type : 'post',
            // url : 'reportMemo.do',

            // data : formData
            // });

        }

    });

    return MarkMemoView;

});
