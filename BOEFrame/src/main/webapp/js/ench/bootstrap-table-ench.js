require(['bootstrap-table'], function() {



    var insertData = function(data, position) {

        this.data.splice(position, 0, data);

        this.options.data = this.data;

        this.initSort();
    };


    var append = function(data) {
        if (data.position !== undefined) {
            this.insertData(data.row, data.position);
        } else {

            this.initData(data.row, true);
        }
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };


    $.extend(true, $.fn.bootstrapTable.Constructor.prototype, {
        insertData: insertData,
        append: append
    });

});
