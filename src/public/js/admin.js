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
var menuAttribute = $('.admin-attribute');
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
} else if (currentPath == '/admin/attribute') {
  menuAttribute.addClass('active');
} else {
  $('.item-menu').removeClass('active');
}

// preview image product
$('#image_prd').on('change', function() {
  var file = this.files[0];
  if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#image_prd_preview').attr('src', e.target.result).show();
      }
      reader.readAsDataURL(file);
  }
});

jQuery(document).ready(function () {
  ImgUpload();
});

function ImgUpload() {
  var imgWrap = "";
  var imgArray = [];

  $('.upload__inputfile').each(function () {
    $(this).on('change', function (e) {
      imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
      var maxLength = $(this).attr('data-max_length');

      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var iterator = 0;
      filesArr.forEach(function (f, index) {

        if (!f.type.match('image.*')) {
          return;
        }

        if (imgArray.length > maxLength) {
          return false
        } else {
          var len = 0;
          for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] !== undefined) {
              len++;
            }
          }
          if (len > maxLength) {
            return false;
          } else {
            imgArray.push(f);

            var reader = new FileReader();
            reader.onload = function (e) {
              var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
              imgWrap.append(html);
              iterator++;
            }
            reader.readAsDataURL(f);
          }
        }
      });
    });
  });

  $('body').on('click', ".upload__img-close", function (e) {
    var file = $(this).parent().data("file");
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }
    $(this).parent().parent().remove();
  });
}

let content = CKEDITOR.replace('description', {
  language: 'en',
  autoParagraph: false
})

$( '#multiple-select-field' ).select2( {
  theme: "bootstrap-5",
  width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
  placeholder: $( this ).data( 'placeholder' ),
  closeOnSelect: false,
});