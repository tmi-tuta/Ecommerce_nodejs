$('body').on('mouseenter', '.image-list-product', function () {
    var bgshowview = $(this).find('.bg-show-view');
    var btnshowview = $(this).find('.btn-show-view');
    btnshowview.removeClass('d-none');
    bgshowview.removeClass('d-none');
}).on('mouseleave', '.image-list-product', function () {
    var bgshowview = $(this).find('.bg-show-view');
    var btnshowview = $(this).find('.btn-show-view');
    btnshowview.addClass('d-none');
    bgshowview.addClass('d-none');
});