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
                    <th scope="col">Store</th>
                    <th scope="col">Address</th>
                    <th scope="col">Availability</th>
                </tr>`;
        $.each(storeObjs, function (idx, obj) {
            storeListTable += `
                <tr>
                    <td scope="row">${obj.name}</td>
                    <td>${obj.address}</td>
                    <td><button 
                            type="button" 
                            class="btn-availability" 
                            data-store-id=${obj.id} 
                            onclick=fetchAvailability(${obj.id})
                        >Check Availability</button></th>
                </tr>`;
        });
        storeListTable += "</table>"
    }

    // console.log("storeListTableHtml: " + storeListTable);
    $(".stores-list").html(storeListTable);
}

async function fetchStoreObjects() {
    // TODO: Fetch objects instead of reading from a file

    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/stores",
        updateStoreListTable);
}

function updateAvailabilityTable(availabilityObj) {
    console.log(availabilityObj);
}

async function fetchAvailability(storeId) {
    console.log("fetchAvailability: " + storeId);
    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/availability",
        updateAvailabilityTable);
}

$().ready(async function () {
    await showCurrentTime();
    await fetchStoreObjects();
    showStores();
});
