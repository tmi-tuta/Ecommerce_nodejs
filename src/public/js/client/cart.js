$(".add-cart").click(function(e) {
    const id = $(this).attr("data-id");
    $.ajax({
      url: "/cart/add-to-cart/" + id,
      method: "GET",
      success: data => {
        location.reload();
        alert('add product to cart success');
      }
    });
});

///////