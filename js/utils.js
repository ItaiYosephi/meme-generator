
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function sortAssocObject(list) {
    var sortable = [];
    for (var key in list) {
        sortable.push([key, list[key]]);
    }

    sortable.sort(function(a, b) {
        return (a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0));
    });

    var orderedList = {};
    for (var i = 0; i < sortable.length; i++) {
        orderedList[sortable[i][0]] = sortable[i][1];
    }

    return orderedList;
}
