async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDateString() {
    return new Date().toLocaleString();
}

async function showCurrentTime() {
    let dateStr = await getDateString();
    document.querySelector('#when').textContent = dateStr;
}

function showStores() {
    $(".stores-list").show();
    $(".store-availability").hide();
}

function showAvailability() {
    $(".stores-list").hide();
    $(".store-availability").show();
}

function updateStoreListTable(storeObjs) {
    console.log("updateStoreListTable(): " + storeObjs.length);
    let storeListTable = "<h2>Stores</h2>";
    if (storeObjs.length === 0) {
        storeListTable += "<p>No stores in this area!!</p>"
    } else {
        storeListTable += `
            <table>
                <tr>
                    <th>Store</th>
                    <th>Address</th>
                    <th>Reserve (button)</th>
                </tr>`;
        $.each(storeObjs, function (idx, obj) {
            storeListTable += `
                <tr>
                    <td>${obj.name}</td>
                    <td>${obj.address}</td>
                    <td>Reserve (button)</th>
                </tr>`;
        });
        storeListTable += "</table>"
    }

    console.log("storeListTableHtml: " + storeListTable);
    $(".stores-list").html(storeListTable);
}

async function fetchStoreObjects() {
    // TODO: Fetch objects instead of reading from a file

    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/stores", 
        updateStoreListTable);
}

$().ready(async function () {
    await showCurrentTime();
    await fetchStoreObjects();
    showStores();
});
