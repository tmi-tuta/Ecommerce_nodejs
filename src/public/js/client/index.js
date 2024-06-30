$('body').on('click', '.image-list-product', function () {
    var bgshowview = $(this).find('.bg-show-view');
    var btnshowview = $(this).find('.btn-show-view');
    if (btnshowview.hasClass('d-none') && bgshowview.hasClass('d-none')) {
        btnshowview.removeClass('d-none');
        bgshowview.removeClass('d-none');
    } else {
        btnshowview.addClass('d-none');
        bgshowview.addClass('d-none');
    }
});