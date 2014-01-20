;(function($) {
    $.fn.gaOutbound = function(options) {
        var defaults = {
            timeout: 250
        };
        options = $.extend(true, {}, defaults, options);
        return this.filter(function() {
            var link = this;
            var origin = location.origin
                ? location.origin
                : (location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : ''));
            if (link.tagName.toLowerCase !== 'a') {
                return false;
            }
            if (link.origin === origin) {
                return false;
            }
            $(link).on('click', function (event) {
                var elem = this;
                var $elem = $(elem);
                event.preventDefault();
                var url = $elem.attr('href');
                var title = $elem.text();
                var timer = setTimeout(function() {
                    location.href = url;
                }, options.timeout);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Outbound Links',
                    eventAction: url,
                    eventLabel: title || url,
                    hitCallback: function() {
                        clearTimeout(timer);
                        location.href = url;
                    }
                });
            });
        });
    };
})(jQuery);
