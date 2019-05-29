const fractalTypeSelect = document.getElementById("fractalType");

fractalTypeSelect.addEventListener('change', e => {
    document.querySelector('form.tree').classList.toggle('hidden');
    document.querySelector('form.juliaForm').classList.toggle('hidden');
})