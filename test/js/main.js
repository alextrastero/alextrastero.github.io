function setupSorter () {
  var asc = document.getElementById('js-asc');
  var desc = document.getElementById('js-desc');
  var list = document.getElementById('js-list');

  if (!list) return;

  desc.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    var children = Array.prototype.slice.call(list.childNodes);
    children.reverse();

    list.innerHTML = '';
    for (i = 0; i < children.length; ++i) {
      list.appendChild(children[i]);
    }

    desc.classList.add('is-active');
    asc.classList.remove('is-active');
  });

  asc.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    var children = Array.prototype.slice.call(list.childNodes);
    children.reverse();

    list.innerHTML = '';
    for (i = 0; i < children.length; ++i) {
      list.appendChild(children[i]);
    }

    asc.classList.add('is-active');
    desc.classList.remove('is-active');
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  setupSorter();
});
