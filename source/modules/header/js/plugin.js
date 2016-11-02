/**
 * header jQuery plugin
 * @copyright Squiz
 * @preserve
 */
(function($, window, document, undefined) {
    'use strict';

    var pluginName = "header",
        defaults = {
            propertyName: "value"
        };

    /**
     * header jQuery Plugin
     * @constructor
     * @param  {object} elem    The DOM element
     * @param  {object} options JSON hash of options to apply
     * @return {void}
     */
    function header(elem, options) {
        this.elem = elem;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }//end header constructor

    // Public methods
    header.prototype = {
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
                $.data(this, "plugin_" + pluginName, new header(this, options));
            }
        });
    };

})(jQuery, window, document);