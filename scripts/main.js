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
                        >Check Availability</button></td>
                </tr>`;
        });
        storeListTable += "</table>"
    }

    // console.log(storeListTable);
    $(".stores-list").html(storeListTable);
    showStores();
}

async function fetchStoreObjects() {
    // TODO: Fetch objects instead of reading from a file

    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/stores",
        updateStoreListTable);
}

function toDateStr(epoch) {
    epoch_ms = 1000 * parseInt(epoch);
    let date = new Date(epoch_ms);
    return date.toString();
    // return `${date.getHours()}:${date.getMinutes()} on ${date.getDay()}, ${date.getMonth()}/${date.getDate()}`;
}

function updateAvailabilityTable(availabilityObj) {
    console.log(availabilityObj);
    let availabilityTable = `
        <h2>Availability for ${availabilityObj.storeName}, ${availabilityObj.storeAddress}</h2>`;

    let availableSlots = "";
    $.each(availabilityObj.slots, function (idx, obj) {
        let areSlotsAvailable = parseInt(obj.slotAvailable) > 0;
        console.log(obj + " " + areSlotsAvailable);
        if (areSlotsAvailable) {
            availableSlots += `
                <tr>
                    <td scope="row">${toDateStr(obj.slotStart)}</td>
                    <td>${obj.slotAvailable}</td>
                    <td><button
                        type="button" 
                        class="btn-reserve" 
                        data-store-id=${availabilityObj.storeId}
                        data-start-time=${obj.slotStart}
                        data-end-time=${obj.slotEnd}
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
    availabilityTable +=
        `<button type="button" class="btn-show-stores">Other Stores</button>`;

    // console.log(availabilityTable);
    $(".store-availability").html(availabilityTable);
    showAvailability();
}

async function fetchAvailability(storeId) {
    console.log("fetchAvailability: " + storeId);
    $.getJSON(
        "https://my-json-server.typicode.com/ajaykalangi/ajaykalangi.github.io/availability",
        updateAvailabilityTable);
}

$(document).on("click", ".btn-availability", async function () {
    console.log("availability btn callback called");
    await fetchAvailability(this.dataset.storeId);
});

$(document).on("click", ".btn-reserve", function () {
    console.log("reserve btn callback called");
    let reservation = "You have reserved a slot at " +
        this.dataset.storeId + " at " + toDateStr(this.dataset.startTime);
    alert(reservation);
    showStores();
});

$(document).on("click", ".btn-show-stores", function () {
    console.log("show stores btn callback called");
    showStores();
});

$().ready(async function () {
    await showCurrentTime();
    await fetchStoreObjects();
});
