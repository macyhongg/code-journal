var $photoURL = document.querySelector('#photoURL');
var $photosrc = document.querySelector('img');
var $ul = document.querySelector('ul');
var entries = data.entries;
var $form = document.querySelector('form');
var $navEntries = document.querySelector('.navEntries');
var $entryForm = document.getElementById('entry-form');
var $entries = document.getElementById('entries');

// Updates the image from photoURL
$photoURL.addEventListener('change', function changeURL(event) {
  var $photoInput = event.target.value;
  $photosrc.setAttribute('src', $photoInput);
});

// Shows the entry form
function entriesView(event) {
  $entryForm.className = 'hidden';
  $entries.classList.remove('hidden');
}

$navEntries.addEventListener('click', entriesView);

// Submit new entry
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
  entries.unshift(entry);

  $form.reset();
  $photosrc.setAttribute('src', 'images/placeholder-image-square.jpg');
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

for (let i = 0; i < entries.length; i++) {
  var newEntry = renderEntry(entries[i]);
  $ul.appendChild(newEntry);
}
