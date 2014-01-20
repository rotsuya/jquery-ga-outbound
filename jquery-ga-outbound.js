;(function($) {
    $.fn.gaOutbound = function(options) {
        var defaults = {
            timeout: 250,
            permitSameOrigin: false,
            debug: false
        };
        options = $.extend(true, {}, defaults, options);
        return this.filter(function() {
            var getOrigin = function(loc) {
                var port = loc.port;
                if ((loc.protocol === 'http:' && port === '80')
                    || (loc.protocol === 'https:' && loc.port === '443')) {
                    port = '';
                }
                if (port) {
                    port = ':' + port;
                }
                return loc.protocol + '//' + loc.hostname + port;
            };
            var link = this;
            var linkOrigin = link.origin ? link.origin : getOrigin(link);
            var locationOrigin = location.origin ? location.origin : getOrigin(location);
            if (link.tagName.toLowerCase() !== 'a') {
                return false;
            }
            if (!options.permitSameOrigin && linkOrigin === locationOrigin) {
                return false;
            }
            $(link).click(function (event) {
                var elem = this;
                var $elem = $(elem);
                event.preventDefault();
                var url = $elem.attr('href');
                var title = $elem.text();
                if (options.debug) {
                    console.time('jquery-ga-outbound');
                }
                var timer = setTimeout(function() {
                    if (options.debug) {
                        console.timeEnd('jquery-ga-outbound');
                        console.log('fired set timeout callback.');
                    }
                    location.href = url;
                }, options.timeout);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Outbound Links',
                    eventAction: url,
                    eventLabel: title || url,
                    hitCallback: function() {
                        clearTimeout(timer);
                        if (options.debug) {
                            console.timeEnd('jquery-ga-outbound');
                            console.log('fired ga hit callback.');
                        }
                        location.href = url;
                    }
                });
            });
            return true;
        });
    };
})(jQuery);
