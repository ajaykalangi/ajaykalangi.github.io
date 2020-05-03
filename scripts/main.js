async function populateWhen() {
    let whenBlock = document.querySelector('#when');
    whenBlock.textContent = new Date().toLocaleString();
}

populateWhen();

