$('body').on('click', '.item-menu', function () {
    var $this = $(this);
    if (!$this.hasClass('active')) {
        $('.item-menu').removeClass('active');
        $this.addClass('active');
    }
})

$('.data-table').dataTable( {
    "language": {
      "search": "Search:",
      "sEmptyTable": "No empty record."
    }
  });

const currentPath = window.location.pathname;
var menuRole = $('.admin-role');
var menuStaff = $('.admin-staff');
var menuType = $('.admin-type');
var menuBrand = $('.admin-brand');
var menuColor = $('.admin-color');
var menuProduct = $('.admin-product');
var menuOrder = $('.admin-order');
var menuVoucher = $('.admin-voucher');
var menuWarehouse = $('.admin-warehouse');
if (currentPath == '/admin/role') {
  menuRole.addClass('active');
} else if (currentPath == '/admin/staff') {
  menuStaff.addClass('active');
} else if (currentPath == '/admin/type') {
  menuType.addClass('active');
} else if (currentPath == '/admin/brand') {
  menuBrand.addClass('active');
} else if (currentPath == '/admin/color') {
  menuColor.addClass('active');
} else if (currentPath == '/admin/product') {
  menuProduct.addClass('active');
} else if (currentPath == '/admin/order') {
  menuOrder.addClass('active');
} else if (currentPath == '/admin/voucher') {
  menuVoucher.addClass('active');
} else if (currentPath == '/admin/warehouse') {
  menuWarehouse.addClass('active');
} else {
  $('.item-menu').removeClass('active');
}