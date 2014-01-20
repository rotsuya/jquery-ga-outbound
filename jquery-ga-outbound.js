;(function($) {
    $.fn.gaOutbound = function(options) {
        var defaults = {
            timeout: 250
        };
        options = $.extend(true, {}, defaults, options);
        return this.filter(function() {
            var getOrigin = function(loc) {
                return loc['protocol'] + '//' + loc['hostname'] + (loc['port'] ? ':' + loc['port'] : '');
            };
            var link = this;
            var linkOrigin = link.origin ? link.origin : getOrigin(link);
            var locationOrigin = location.origin ? location.origin : getOrigin(location);
            if (link.tagName.toLowerCase() !== 'a') {
                return false;
            }
            if (linkOrigin === locationOrigin) {
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
            return true;
        });
    };
})(jQuery);
