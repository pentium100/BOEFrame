define(['backbone', 'model/reportMemo'], function (Backbone, ReportMemo) {

    var ReportMemos = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: ReportMemo,
        url:'reportMemo.do'

    });
    return ReportMemos;
});
