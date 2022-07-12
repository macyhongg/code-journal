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
  var entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('local-journal', entriesJSON);
}

var previousEntriesJSON = localStorage.getItem('local-journal');

if (previousEntriesJSON != null) {
  data.entries = JSON.parse(previousEntriesJSON);
}
