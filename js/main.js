var $photoURL = document.querySelector('#photoURL');
var $photosrc = document.querySelector('img');

$photoURL.addEventListener('change', function changeURL(event) {
  var $photoInput = event.target.value;
  $photosrc.setAttribute('src', $photoInput);
});

// var $submit = document.querySelector('#submit');

var $form = document.querySelector('form');
$form.addEventListener('submit', logSubmit);

function logSubmit(event) {
  event.preventDefault();
  var entry = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entry);

  $form.reset();
  $photosrc.setAttribute('src', 'images/placeholder-image-square.jpg');
}
