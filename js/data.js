/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// Save to local storage
window.addEventListener('beforeunload', store);

function store(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('local-journal', dataJSON);
}

var previousEntriesJSON = localStorage.getItem('local-journal');

if (previousEntriesJSON != null) {
  data = JSON.parse(previousEntriesJSON);
}

// Shows the entry form

var $navEntries = document.querySelector('.navEntries');
var $entryForm = document.getElementById('entry-form');
var $entries = document.getElementById('entries');

function entriesView(event) {
  $entryForm.className = 'hidden';
  $entries.classList.remove('hidden');
}

$navEntries.addEventListener('click', entriesView);
