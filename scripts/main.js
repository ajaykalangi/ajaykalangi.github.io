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
                        >Check Availability</button></td>
                </tr>`;
        });
        storeListTable += "</table>"
    }

    console.log(storeListTable);
    $(".stores-list").html(storeListTable);
    showStores();
}

async function fetchStoreObjects() {
    // TODO: Fetch objects instead of reading from a file

    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/stores",
        updateStoreListTable);
}

function updateAvailabilityTable(availabilityObj) {
    console.log(availabilityObj);
    let availabilityTable = `
        <h2>Availability</h2>
        <h4>${availabilityObj.storeName}, ${availabilityObj.storeAddress}</h4>
    `;

    let availableSlots = "";
    $.each(availabilityObj.slots, function(idx, obj) {
        let areSlotsAvailable = parseInt(obj.slotAvailable) > 0;
        console.log(obj + " " + areSlotsAvailable);
        if (areSlotsAvailable) {
            availableSlots += `
                <tr>
                    <td scope="row">${obj.slotStart} - ${obj.slotEnd}</td>
                    <td>${obj.slotAvailable}</td>
                    <td><button
                        type="button" 
                        class="btn-reserve" 
                        data-store-id=${availabilityObj.storeId}
                        data-start-time=${obj.slotStart}
                        data-end-time=${obj.slotEnd}
                        onclick=reserve(${availabilityObj.storeId})                   
                    >Reserve</button></td>
                </tr>`;
        }
    });

    if (availableSlots.length > 0) {
        availabilityTable += `
            <table>
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Available Slots</th>
                    <th scope="col">Reserve</th>
                </tr>
                ${availableSlots}   
            </table>
        `;
    } else {
        availabiliytTable += "<p>No available slots at this store!</p>";
    }

    console.log(availabilityTable);
    $(".store-availability").html(availabilityTable);
    showAvailability();
}

async function fetchAvailability(storeId) {
    console.log("fetchAvailability: " + storeId);
    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/availability",
        updateAvailabilityTable);
}

// function reserve(storeId, startTime, endTime) {
    // console.log("reserve: " + storeId + ": " + startTime + " - " + endTime);
function reserve(storeId) {
    console.log("reserve: " + storeId);
}

$().ready(async function () {
    await showCurrentTime();
    await fetchStoreObjects();
});
