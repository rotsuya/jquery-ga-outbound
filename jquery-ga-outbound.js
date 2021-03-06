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
                var alt = $elem.children('img').eq(0).attr('alt');
                if (options.debug) {
                    if (window.console && console.time) {
                        console.time('jquery-ga-outbound');
                    }
                }
                var timer = setTimeout(function() {
                    if (options.debug) {
                        if (window.console && console.timeEnd) {
                            console.timeEnd('jquery-ga-outbound');
                        }
                        if (window.console && console.log) {
                            console.log('fired set timeout callback.');
                        } else {
                            alert('fired set timeout callback.');
                        }
                    }
                    location.href = url;
                }, options.timeout);
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Outbound Links',
                    eventAction: url,
                    eventLabel: title || alt || url,
                    hitCallback: function() {
                        clearTimeout(timer);
                        if (options.debug) {
                            if (window.console && console.timeEnd) {
                                console.timeEnd('jquery-ga-outbound');
                            }
                            if (window.console && console.log) {
                                console.log('fired ga hit callback.');
                            } else {
                                alert('fired set timeout callback.');
                            }
                        }
                        location.href = url;
                    }
                });
            });
            return true;
        });
    };
})(jQuery);
