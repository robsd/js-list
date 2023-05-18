output = document.getElementById('list');

function getItems() {
	list = JSON.parse(localStorage.getItem('list'));
	if (!list) {
		return [];
	}
	return list;
}

function setItems(list) {
	newList = JSON.stringify(list);
	localStorage.setItem('list', newList);
}

function addItem() {
	item = document.getElementById('item');
	itemText = item.value;
	item.value = "";
	list = getItems();
	if (itemText) {
		output.innerHTML += '<button class="list-group-item list-group-item-action" onclick="checkItem(this);" id="' + list.length + '"><i class="fas fa-check fa-fw text-success me-3"></i>' + itemText + '</button>';
		list = getItems();
		list.push({'checked': 0, 'text': itemText});
		setItems(list);
	}
}

function checkItem(item) {
	item.setAttribute('onclick', 'deleteItem(this);');
	item.classList.add('text-muted');
	item.innerHTML = '<i class="fas fa-trash fa-fw text-danger me-3"></i><del>' + item.innerText + '</del>';
	list = getItems();
	list[item.id]['checked'] = 1;
	setItems(list);
}

function deleteItem(item) {
	item.remove();
	id = item.id;
	list = getItems();
	delete list[id];
	setItems(list);
}

list = getItems();
layout = '';

for (i = 0; i < list.length; i++) {
	if (list[i]['checked']) {
		layout += '<button class="list-group-item list-group-item-action text-muted" onclick="deleteItem(this);" id="' + i + '">';
		layout += '<i class="fas fa-trash fa-fw text-danger me-3"></i>';
		layout += '<del>' + list[i]['text'] + '</del>';
	}
	else {
		layout += '<button class="list-group-item list-group-item-action" onclick="checkItem(this);" id="' + i + '">';
		layout += '<i class="fas fa-check fa-fw text-success me-3"></i>';
		layout += list[i]['text'];
	}
	layout += '</button>';
}

output.innerHTML = layout;

document.addEventListener("keydown", function(event) {
	if (event.key == 'Enter') {
		addItem();
	}
});