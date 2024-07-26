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

var isProcessing = false;
$('body').on('click', '.minus-btn, .plus-btn', function (e) {
    var totalInputCounter = $('tt-input-counter');
    if (isProcessing) return;
    isProcessing = true;
    var $input = $(this)
      .parent()
      .find('input');
    var count = parseInt($input.val(), 10) + parseInt(e.currentTarget.className === 'plus-btn' ? 1 : -1, 10);
    if (count < 0) count = 0;
    if (count > 20) count = 20;
    $input.val(count).change();
    const id = $input.parents().attr('data-id');

    $.ajax({
      url: '/cart/modify-cart',
      method: 'GET',
      data: { id: id, qty: count },
      success: data => {
        isProcessing = false;
        location.reload();
      }
    });
    totalInputCounter.find('input').change(function() {
      var _ = $(this);
      var min = 1;
      var val = parseInt(_.val(), 10);
      var max = parseInt(_.attr('size'), 10);
      val = Math.min(val, max);
      val = Math.max(val, min);
      _.val(val);
    }).on('keypress', function(e) {
      let count = parseInt($(this).val(), 10);
      if (count < 0) count = 0;
      if (count > 20) count = 20;
      if (e.keyCode === 13) {
        e.preventDefault();
        const id = $(this)
          .parents()
          .attr('data-id');
        $.ajax({
          url: '/cart/modify-cart',
          method: 'GET',
          data: { id: id, qty: count },
          success: data => {
            location.reload();
          }
        });
      }
    });
});

$('.thumbnail').click(function() {
  var newSrc = $(this).attr('src');
  $('.mainImage').attr('src', newSrc);
});

$('#reviewForm').submit(function(event) {
  event.preventDefault();

  var product_id = $('#product_id').val();
  var rating = $('#rating').val();
  var comment = $('#comment').val();
  var formData = {
      product_id: product_id,
      rating: rating,
      comment: comment
  };
  $.ajax({
      url: '/review/store',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
          toastr.success('Đánh giá của bạn đã được gửi thành công!');
          $('#reviewForm')[0].reset(); 
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
          toastr.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
  });
});