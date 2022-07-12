var $photoURL = document.querySelector('#photoURL');
var $photosrc = document.querySelector('img');

$photoURL.addEventListener('change', function (event) {
  var $photoInput = event.target.value;
  $photosrc.setAttribute('src', $photoInput);
});
