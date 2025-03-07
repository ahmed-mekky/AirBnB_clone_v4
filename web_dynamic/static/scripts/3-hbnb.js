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
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ amenitiesIds : Object.keys(amenitiesChecked)}),
    success: function (data) {
      for (let place of data) {
        let article = ['<div class="title_box">',
          '<h2>', place.name, '</h2>',
          '<div class="price_by_night">', '$', place.price_by_night, '</div>',
          '</div>',
          '<div class="information">',
          '<div class="max_guest">', place.max_guest, ' Guest', (place.max_guest !== 1) ? 's' : '', '</div>',
          '<div class="number_rooms">', place.number_rooms, ' Bedroom', (place.number_rooms !== 1) ? 's' : '', '</div>',
          '<div class="number_bathrooms">', place.number_bathrooms, ' Bathroom', (place.number_bathrooms !== 1) ? 's' : '', '</div>',
          '</div>',
          '<div class="description">', place.description, '</div>'];
        $('article').append(article.join(''));
      }
    }
  });
});
