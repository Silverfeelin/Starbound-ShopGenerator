const addText = "#itemDescriptorAdd",
      addError = "#itemDescriptorAddError",
      editText = "#itemDescriptorEdit",
      editError = "#itemDescriptorEditError",
      itemList = "#itemList";

const template = {
  name: "silverore",
  count: 1,
  parameters: {
    shortdescription: "My Special Silver Ore."
  }
};

var pendingChanges = false;

// Page load
$(function() {
  "use strict";
  
  // Set feature background image based on time of day.
  var time = new Date().getHours(), path;
  
  path = time >= 18 || time < 6 ? "imgs/bgNight.jpg" : "imgs/bgDay.jpg";
  
  document.getElementById("featureBackground").style.backgroundImage = "url('" + path +  "')";
  
  $("#itemDescriptorAddError").hide();
  $("#itemDescriptorEditError").hide();
  $("#editDiv :input").attr("disabled", true);
  
  // Add item
  $("#btnAdd").click(function() {
    var desc = getItemDescriptor(addText, addError);
    if (desc) {
      addItem(desc);
    }
  });
  
  // Load template
  $("#btnAddTemplate").click(function() {
    $(addText).val(JSON.stringify(template, null, 2));
  });
  
  // Clear add item text
  $("#btnAddClear").click(function() {
    $(addText).val("");
  });
    
  // Update item
  $("#btnUpdate").click(function() {
    var desc = getItemDescriptor(editText, editError);
    if (desc && typeof desc == "object")
    {
      updateItem(getSelectedOption(), desc);
      pendingChanges = false;
    }
  });
  
  // Cancel update
  $("#btnCancelUpdate").click(function() {
    $(editText).val(JSON.stringify(getSelectedOption().data("value"), null, 2));
    pendingChanges = false;
  });
  
  // Set item updated flag
  $(editText).bind('input propertychange', function () {
    if (!$("#editDiv :input").first().attr("disabled"))
      pendingChanges = true;
  });
  
  // Delete selected item
  $("#btnDelete").click(function() {
    $("#itemList :selected").remove();
    $("#itemList").change();
  });
  
  // Prevent changing item when changes are made (happens before itemList.change handler).
  $("#itemList").mousedown(function(e) {
    if (pendingChanges) {
      alert("Please save or cancel the changes to your selected item first!");
      e.preventDefault();
    }
  });
  
  // Select item
  $("#itemList").change(function() {
    pendingChanges = false;
    var item = $("#itemList :selected").data("value");
    if (item)
    {
      $(editText).val(JSON.stringify(item, null, 2));
      $("#editDiv :input").attr("disabled", false);
    }
    else
    {
      $(editText).val("");
      $("#editDiv :input").attr("disabled", true);
    }
  });
  
  // Unselect item
  $("#btnClearSelection").click(function() {
    $("#itemList option:selected").prop("selected", false);
    $(itemList).change();
  });
  
  // Clear items
  $("#btnClear").click(function () {
    $(itemList).empty();
    $(itemList).change();
  });
  
  // Load from storage
  loadItems();
});

// Page unload
$(window).on("beforeunload", function() {
  saveItems();
});

/**
* Returns the item descriptor from textArea as a JSON object.
* If the textArea contains an invalid descriptor, show the first error and return null.
* When omitted, count defaults to 1 and parameters defaults to {}.
* @param {string} textArea - jQuery selector for the textArea to check.
* @param {string} errorLabel - jQuery selector for the error <p> to show the error in.
* @return {object} Item descriptor object, or null if the descriptor isn't valid.
*/
function getItemDescriptor(textArea, errorLabel)
{
  var res = durableJsonLint($(textArea).val());
  var j = JSON.parse(res.json),
      e = res.errors;
    
  // Check for errors.
  if (e.length > 0)
  {
    showError(errorLabel, e[0].description ? e[0].description : "Invalid Json structure. Does the code start and end with a bracket?");
    return null;
  }  
  
  // Add missing keys.
  if (typeof j.count == "undefined") j.count = 1;
  if (typeof j.parameters == "undefined") j.parameters = {};
  
  // Check for item descriptor errors (name, count, parameters).
  if (typeof j.name != "string")
  {
    showError(errorLabel, "Item descriptors must have a \"name\" set.");
  }  
  else if (typeof j.count != "number" || !Number.isInteger(j.count))
  {
    showError(errorLabel, "Item count must be an integer.");
  }
  else if (typeof j.parameters != "object") {
    showError(errorLabel, "Item parameters must be a Json object.");
  }
  else {
    $(errorLabel).hide();
    return j;
  }
  
  return null;
}

/**
* Shows an error message.
* @param {string} id - jQuery selector for <p> to set message in.
* @param {string} message - Message to display.
*/
function showError(id, message)
{
  $(id).html(message);
  $(id).show();
}

/**
* Adds an item descriptor to the shop item list.
* Does not check for item validity.
* @param {object} desc - Valid item descriptor.
*/
function addItem(desc)
{
  var el = $('<option>', {
    text: getItemName(desc)
  })
  el.data("value", desc);
  $(itemList).append(el);
}

/**
* Returns the (first) selected item, if any.
* If no item is selected, ret.length will be 0.
* @return {object} - jQuery object of the selected item.
*/
function getSelectedOption()
{
  return $("#itemList :selected").first();
}

/**
* Updates the shop item <option> using the new item descriptor.
* The displayed text and data-value of the <option> are updated.
* @param {object} option - jQuery object of the <option> to update.
* @param {object} desc - Valid item descriptor.
*/
function updateItem(option, desc)
{
  if (option.data("value"))
  {
    option.data("value", desc);
  }
  option.html(getItemName(desc));
}

/**
* Returns an item name for displaying. Does not apply Starbound colors.
* @param {object} desc - Valid item descriptor.
* @return {string} - Item name (prioritizes shortdescription over name).
*/
function getItemName(desc)
{
  return desc.parameters && desc.parameters.shortdescription ? desc.parameters.shortdescription : desc.name;
}

function loadItems(storageKey = "shopItems")
{
  var loadedItems = localStorage.getItem(storageKey);
  if (loadedItems)
  {
    loadedItems = JSON.parse(loadedItems);
    for (var i = 0; i < loadedItems.length; i++)
    {
      addItem(loadedItems[i]);
    }
  }
}

function saveItems(storageKey = "shopItems")
{
  var items = [];
  $("#itemList > option").each(function() {
    items.push($(this).data("value"));
  });
  localStorage.setItem(storageKey, JSON.stringify(items));
}