document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast-container');
    if (toast) {
        setTimeout(() => {
            toast.style.display = 'none';
        }, 5000);
    }
});

function setEditModal(id, name, surname, email, role) {
    document.getElementById('edit-user-form').action = `/admin/update/${id}`;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-surname').value = surname;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-role').value = role;
}