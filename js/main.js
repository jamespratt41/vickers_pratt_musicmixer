console.log('fired');

const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill listeners
fill.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);

  empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}



function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}
