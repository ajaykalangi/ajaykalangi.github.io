function getItems() {
  console.log("Executing getItems()");
  var items = [];
  $.getJSON("https://my-json-server.typicode.com/typicode/demo/posts", function (data) {
    console.log(data);
    $.each(data, function (idx, obj) {
      $.each(obj, function (key, val) {
        var item = "(id = " + key + ", val = " + val + ")";
        console.log(item);
        items.push(item);
      });
    });
  });
  return items;
}

function setTime() {
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  $("#when").html(time);
}

$().ready(function () {
  setTime();

  $.getJSON("https://my-json-server.typicode.com/typicode/demo/posts", function (data) {
    console.log(data);
    var items = [];
    $.each(data, function (idx, obj) {
      var item = "(id = " + obj.id + ", title = " + obj.title + ")";
      console.log(item);
      items.push(item);
    });
    var itemList = $('<ul>', { class: "mylist" }).append(
      items.map(item =>
        $("<li>").append($("<a>").text(item))
      )
    );
    console.log(itemList);
    $("#content").html(itemList);
  });

  // var items = getItems();
  console.log("Reached the end");
});