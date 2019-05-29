const fractalTypeSelect = document.getElementById("fractalType");

fractalTypeSelect.addEventListener('change', e => {

    if (!document.querySelector(`form.tree`).classList.contains('hidden')) {
        document.querySelector(`form.tree`).classList.add('hidden');
    };
    if (!document.querySelector(`form.juliaForm`).classList.contains('hidden')) {
        document.querySelector(`form.juliaForm`).classList.add('hidden');
    };

    document.querySelector(`form[name=${fractalTypeSelect.value}]`).classList.remove('hidden');
})