// Queried variables
var $photoURL = document.querySelector('#photoURL');
var $photosrc = document.querySelector('img');
var $ul = document.querySelector('ul');
// var entries = data.entries;
var $form = document.querySelector('form');
var $navMain = document.querySelector('.navMain');
var $entryForm = document.getElementById('entry-form');
var $navEntries = document.querySelector('.navEntries');
var $entries = document.getElementById('entries');
var $views = document.querySelectorAll('.view');

// Updates the image from photoURL
$photoURL.addEventListener('change', function changeURL(event) {
  var $photoInput = event.target.value;
  $photosrc.setAttribute('src', $photoInput);
});

// Views
function entriesView(event) {
  $entryForm.className = 'hidden';
  $entries.classList.remove('hidden');
  data.view = 'entries';
}

function entryformView(event) {
  $entries.className = 'hidden';
  $entryForm.classList.remove('hidden');
  data.view = 'entry-form';
}

function showView(targetView) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetView) {
      $views[i].className = 'view';
      data.view = targetView;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

// Submit new entry

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

  var currentEntry = renderEntry(entry);
  $ul.prepend(currentEntry);
  entriesView();
}

// Take single entry and return a DOM tree
function renderEntry(entry) {
  var newLi = document.createElement('li');
  newLi.className = 'margin-bottom row';

  var newImg = document.createElement('img');
  newImg.className = 'column-half';
  newImg.setAttribute('src', entry.photoURL);

  var newSection = document.createElement('section');
  newSection.className = 'column-half';

  var newTitle = document.createElement('h2');
  var titleText = document.createTextNode(entry.title);
  newTitle.appendChild(titleText);

  var newNotes = document.createElement('p');
  var notesText = document.createTextNode(entry.notes);
  newNotes.appendChild(notesText);

  newLi.appendChild(newImg);
  newLi.appendChild(newSection);
  newSection.appendChild(newTitle);
  newSection.appendChild(newNotes);

  return newLi;
}

// Event Listeners
$navEntries.addEventListener('click', entriesView);
$navMain.addEventListener('click', entryformView);
$form.addEventListener('submit', logSubmit);
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $ul.appendChild(newEntry);
  }
  showView(data.view);
});
