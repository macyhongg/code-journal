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
