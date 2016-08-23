/**
 * TEST jQuery plugin
 * @copyright Squiz
 * @preserve
 */
(function($, window, document, undefined) {
    'use strict';

    var pluginName = "test",
        defaults = {
            propertyName: "value"
        };

    /**
     * TEST jQuery Plugin
     * @constructor
     * @param  {object} elem    The DOM element
     * @param  {object} options JSON hash of options to apply
     * @return {void}
     */
    function TEST(elem, options) {
        this.elem = elem;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }//end TEST constructor

    // Public methods
    TEST.prototype = {
        /**
         * Plugin initialisation
         * @return {void}
         */
        init: function() {

        },

        /**
         * [yourOtherFunction description]
         * @return {[type]}
         */
        yourOtherFunction: function() {

        }
    };

    // Use the lightweight plugin wrapper to prevent against multiple instantiations.
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new TEST(this, options));
            }
        });
    };

})(jQuery, window, document);