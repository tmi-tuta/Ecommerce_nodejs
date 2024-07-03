$(".add-cart").click(function(e) {
    const id = $(this).attr("data-id");
    $.ajax({
      url: "/cart/add-to-cart/" + id,
      method: "GET",
      success: data => {
        $(".box-cart").load(" .box-cart > *");
        alert('add product to cart success');
      }
    });
});