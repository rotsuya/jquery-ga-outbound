$('.outbound').on('click', function (event) {
    event.preventDefault();
    var url = $(this).attr('href');
    var title = '';
    switch (url) {
        case 'http://lepas-manis.com':
        case 'http://lepas-manis.com/':
            title = 'home';
            break;
        case 'http://lepas-manis.shop-pro.jp':
        case 'http://lepas-manis.shop-pro.jp/':
            title = 'shop';
            break;
        case 'http://blog.lepas-manis.shop-pro.jp':
        case 'http://blog.lepas-manis.shop-pro.jp/':
            title = 'blog';
            break;
    }
    var timer = setTimeout(function() {
        location.href = url;
    }, 250);
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