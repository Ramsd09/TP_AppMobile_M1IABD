// @author : Amara Diallo / M1IABD-ESP

function ajouterTache() {
  const task = document.getElementById('task');

  if (task.value) {
      const taskList = document.getElementById('taskList');
      const newItem = document.createElement('li');
      newItem.innerHTML = task.value;

      $(newItem).on('swiperight', function () {
          $('#tacheFaites').append(this);
          $(taskList).listview('refresh');
          $('#tacheFaites').listview('refresh');
      });

      $(newItem).on('swipeleft', function () {
          $(this).remove();
          $(taskList).listview('refresh');
      });

      taskList.appendChild(newItem);
      $(taskList).listview('refresh');
      task.value = '';
      task.focus();
  }
}

function reinitialiser() {
  const task = document.getElementById('task');
  const taskList = document.getElementById('taskList');
  const tacheFaites = document.getElementById('tacheFaites');
  taskList.innerHTML = '';
  tacheFaites.innerHTML = '';
  task.value = '';
  task.focus();
}
