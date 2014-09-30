define(['backbone', 'model/menu'], function (Backbone, Menu) {

    var Menus = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Menu,
        url:'getMenu.do'

    });
    return Menus;
});
