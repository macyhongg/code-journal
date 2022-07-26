// Queried variables
var $heading = document.querySelector('h1');
var $title = document.getElementById('title');
var $photoURL = document.querySelector('#photoURL');
var $notes = document.getElementById('notes');
var $photosrc = document.querySelector('img');
var $ul = document.querySelector('ul');
var $form = document.querySelector('form');
var $navMain = document.querySelector('.navMain');
var $navEntries = document.querySelector('.navEntries');
var $entryForm = document.getElementById('entry-form');
var $entries = document.getElementById('entries');
var $saveRow = document.getElementById('save-row');
var $submitdiv = document.getElementById('submit-div');
var $views = document.querySelectorAll('.view');

// Updates the image from photoURL
$photoURL.addEventListener('change', function changeURL(event) {
  var $photoInput = event.target.value;
  $photosrc.setAttribute('src', $photoInput);
});

// View swapping
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

// Editing
$ul.addEventListener('click', edit);

function edit(e) {
  var targetid = e.target.getAttribute('data-entry-id');
  if (e.target.nodeName === 'I') {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(targetid)) {
        data.editing = data.entries[i];
      }
    }
  }
  $heading.childNodes[0].nodeValue = 'Edit Entry';
  $title.value = data.editing.title;
  $photoURL.value = data.editing.photoURL;
  $photosrc.setAttribute('src', data.editing.photoURL);
  $notes.value = data.editing.notes;

  entryformView();

  // Editing - create a delete link button
  var deletediv = document.createElement('div');
  deletediv.className = 'column-half delete-link';
  var deleteEntry = document.createElement('p');
  var deletetext = document.createTextNode('Delete Entry');
  deleteEntry.appendChild(deletetext);
  deletediv.appendChild(deleteEntry);
  $saveRow.prepend(deletediv);
  $saveRow.className = 'row align-items-center';

  $submitdiv.removeAttribute('column-full align-right');
  $submitdiv.className = 'column-half align-right';
}

// Render new or edited entry
function logSubmit(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {
      title: $form.elements.title.value,
      photoURL: $form.elements.photoURL.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };

    data.nextEntryId++;
    data.entries.unshift(entry);
    var newEntry = renderEntry(entry);
    $ul.prepend(newEntry);

  } else {
    var edited = {
      title: $title.value,
      photoURL: $photoURL.value,
      notes: $notes.value,
      entryId: data.editing.entryId
    };

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(data.editing.entryId)) {
        data.entries[i] = edited;
        var editEntry = renderEntry(data.entries[i]);
        var oldEntry = $ul.children[i];
      }
    }
    oldEntry.replaceWith(editEntry);
  }
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

  var newRow = document.createElement('div');
  newRow.className = 'row';

  var newColHalf2 = document.createElement('div');
  newColHalf2.className = 'column-half align-center';

  var newTitle = document.createElement('h2');
  var titleText = document.createTextNode(entry.title);
  newTitle.appendChild(titleText);

  var newPencil = document.createElement('i');
  newPencil.className = 'fa fa-pencil pencil align-center';
  newPencil.setAttribute('data-entry-id', entry.entryId);

  var newNotes = document.createElement('p');
  var notesText = document.createTextNode(entry.notes);
  newNotes.appendChild(notesText);

  newLi.appendChild(newImg);
  newLi.appendChild(newSection);
  newSection.appendChild(newRow);
  newRow.appendChild(newTitle);
  newRow.appendChild(newPencil);
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
