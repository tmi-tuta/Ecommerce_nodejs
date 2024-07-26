$(".add-cart").click(function(e) {
    const id = $(this).attr("data-id");
    $.ajax({
      url: "/cart/add-to-cart/" + id,
      method: "GET",
      success: data => {
        toastr.success('Thêm vào giỏ hàng thành công!');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
});

///////