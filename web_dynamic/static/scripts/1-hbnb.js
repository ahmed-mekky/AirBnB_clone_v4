$(document).ready(function () {
  let amenitiesChecked = {};
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenitiesChecked).join(', '));
  });
});
