document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button');
    const list = document.querySelector('#list');

    button.addEventListener('click', function() {
        if (input.value.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = input.value.trim();

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.addEventListener('click', function() {
                li.remove();
                input.focus();
            });

            li.appendChild(deleteButton);
            list.appendChild(li);
            input.value = '';
            input.focus();
        } else {
            alert('Please enter a chapter.');
            input.focus();
        }
    });
});