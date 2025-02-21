"use strict";
let data_con = {};
fetch("db.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(json_data,"data");
    data_form(data);
    data_con = data;
  });
let div_show_json_data = document.getElementById("data_show");

function data_form(json_data) {
  // console.log("json_data", json_data);
  div_show_json_data.innerHTML = "";
  json_data.items.forEach((item) => {
    // console.log(item, "map");
    let inner_div = document.createElement("div");
    inner_div.className = "col-md-3";

    inner_div.innerHTML = `
    <div class="card mt-3">
     <img src=${item.image} class="card-img-top" alt="..." style="width: 260px; height:100px">
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">${item.description}</p>
    <p class="card-text">${item.price}</p>
    <div class="d-flex justify-content-between">

    <a href="#" class="btn btn-primary " onClick="delete_item(${item.id})">DELETE </a>
    <a href="#" class="btn btn-primary" onClick="update_item(${item.id})">UPDATE</a>
  </div>
  </div>
</div>`;
    // console.log(item.title, "item.title");
    div_show_json_data.appendChild(inner_div);
  });
}

// to create new data
function create_data_form(event) {
  event.preventDefault();
  let last_item = data_con.items;
  const last_item_details = Number(last_item[last_item.length - 1].id);

  // Log the last item
  console.log("Last Item:", typeof(Number(last_item_details)));
  // input data
  let item_link=document.getElementById('Item_img').value;
  let item_title= document.getElementById('Item_title').value;
  let item_description= document.getElementById('Item_dis').value;
  let item_price= document.getElementById('Item_pri').value;
  console.log("title= ",item_link," item_title= ",item_title," item_description= ",item_description," item_price= ",item_price);
  const new_item = { "id":last_item_details+1,
    "image":item_link,
    "title": item_title,
      "description": item_description,
      "price": item_price
   };
  //  console.log("new_item= ",new_item);
   
  // // add item
  fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_item),
  })
    .then((response) => response.json())
    .then((item) => console.log(item));
}

// function to show confirm delete msg
let model_cont = document.getElementById("delete_model_container");
function delete_item(id) {
  let append_modal = document.createElement("div");
  append_modal.className = "modal fade";
  append_modal.id = `deleteModal_${id}`; // Unique ID for each modal
  append_modal.setAttribute("tabindex", "-1");
  append_modal.setAttribute("role", "dialog");
  
  append_modal.innerHTML = 
      `<div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete his item</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" onClick="confirm_delete_item(${id})">Confirm Delete</button>
          </div>
        </div>
      </div>`;

  // Append modal to body
  document.body.appendChild(append_modal);

  // Initialize and show Bootstrap modal
  let modalInstance = new bootstrap.Modal(append_modal);
  modalInstance.show();
}

// function to delete item passed on id after confirm

function confirm_delete_item(id) {
  // console.log("deeeeeeeeeeeeeeeeeeelet",id);
  fetch(`http://localhost:3000/items/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
  // .then(() =>
  // console.log('User deleted')
  // );
}

// update function
let update_model_cont = document.getElementById("update_model_container");
async function update_item(id) {
  console.log("Fetching data for ID:", id);

  try {
    let response = await fetch(`http://localhost:3000/items/${id}`);
    if (!response.ok) throw new Error("Item not found");

    let item = await response.json();
    console.log("Fetched Item Data:", item);

    // **Remove previous modal if it exists to prevent duplicates**
    let existingModal = document.getElementById("update_modal");
    if (existingModal) existingModal.remove();

    // **Create and populate the modal**
    let modalWrapper = document.createElement("div");
    modalWrapper.id = "update_modal";
    modalWrapper.className = "modal fade"; // Bootstrap modal needs 'fade' class
    modalWrapper.tabIndex = "-1"; // Important for Bootstrap
    modalWrapper.innerHTML = 
      `<div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="update_form">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title:</label>
                <input type="text" class="form-control" id="recipient-name" name="title_value" value="${item.title}">
              </div>
              <div class="form-group">
                <label for="description-text" class="col-form-label">Item Description:</label>
                <textarea class="form-control" id="description-text" name="description_value">${item.description}</textarea>
              </div>
              <div class="form-group">
                <label for="price-name" class="col-form-label">Price:</label>
                <input type="text" class="form-control" id="price-name" name="price_value" value="${item.price}">
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Update Item</button>
              </div>
            </form>
          </div>
        </div>
      </div>`;

    // Append modal to body (Bootstrap requires it to be inside <body>)
    document.body.appendChild(modalWrapper);

    // Initialize Bootstrap Modal
    let modalInstance = new bootstrap.Modal(modalWrapper);
    modalInstance.show();

    // **Handle form submission**
    document
      .getElementById("update_form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        let updated_item = {
          title: event.target.title_value.value,
          description: event.target.description_value.value,
          price: event.target.price_value.value,
        };

        console.log("Updated Data to Send:", updated_item);

        // **Send PATCH request**
        try {
          let updateResponse = await fetch(
            `http://localhost:3000/items/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updated_item),
            }
          );

          if (!updateResponse.ok) throw new Error("Update failed");

          let updatedItem = await updateResponse.json();
          console.log("Update Successful:", updatedItem);

          // Close modal after successful update
          modalInstance.hide();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      });
  } catch (error) {
    console.error("Error fetching item:", error);
  }
}