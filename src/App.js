import "./App.css";
import React, { useState } from "react";

function App() {
  const [state, setState] = useState([
    {
      id: 1,
      uid: 1,
      item: 11,
      mid: 123,
      desc: "",
      cqty: 10,
      pqty: 8,
      diff: +2,
      order: 12,
    },
    {
      id: 2,
      uid: 2,
      item: 12,
      mid: 456,
      desc: "",
      cqty: 8,
      pqty: 10,
      diff: -2,
      order: 12,
    },
    {
      id: 3,
      uid: 3,
      item: 13,
      mid: 789,
      desc: "",
      cqty: 10,
      pqty: 15,
      diff: -5,
      order: 12,
    },
  ]);
  
  const [checkedState, setCheckedState] = useState(
    []
  );
  // Function to set all checkboxes to checked
  const selectAllCheckboxes = () => {
    setCheckedState(state.map((item)=>item.id));
  };
  // Handle change for individual checkboxes
  const handleCheckboxChange = (id,e) => {
    const alreadySelected = checkedState.find((item) => item == id)
    let data=null
    if (alreadySelected) {
      //unselect
      data=checkedState.filter((data)=> data !==id)
    } else {
      data=[...checkedState,id]
    }
    setCheckedState(data);
  };
  console.log(checkedState);
  
  const deleteSelectedRows = (id) => {
    // Filter out rows where the corresponding checkbox is checked
    const newRows = state.filter((data)=>data==id);
    setState(newRows);
    // Reset the checked state based on the new number of rows
    setCheckedState(new Array(newRows.length).fill(false));
  };

  const addItem = () => {
    const newItem = { id: state.length + 1, uid: state.length + 1 };

    // Use the spread operator to add the new item to the array
    setState([...state, newItem]);
  };

  const removeItem = (itemId) => {
    // Filter out the item with the given id
    const filteredItems = state.filter((item) => item.id !== itemId);
    // Update the state with the new array
    setState(filteredItems);
  };

  const handleChange = (id, event, key) => {
    const updatedRows = state.map((row) => {
      if (row.id === id) {
        return { ...row, [key]: event.target.value };
      }
      return row;
    });
    setState(updatedRows);
  };

  function sendForCheck() {
    // Disable inputs and buttons in the second and third sections
    const sections = document.querySelectorAll('.container .section ');
    sections[1].classList.add('disabled');
    sections[2].classList.add('disabled');
    
  
    // Disable inputs and buttons explicitly
    sections[1].querySelectorAll('input, button').forEach(elem => elem.disabled = true);
    sections[2].querySelectorAll('input, button').forEach(elem => elem.disabled = true);
  
    // Alert message
    // alert('SENDED FOR CHECK');
   
    const alertBox = document.getElementById('alertBox');
  alertBox.style.display = 'block'; // Show the alert box
  setTimeout(() => {
    alertBox.style.display = 'none'; // Hide the alert box after 3 seconds
  }, 3000);
    
  }


  return (
    <>
      <nav class="navbar">
        <div class="navbar-item">
          <p>ORDER MATERIALS</p>
        </div>
        <div class=" reference-data">
          <button className="rbtn"></button>
          <p>REFERENCE DATA</p>
        </div>
      </nav>

      <div class="form-row">
        <label class="form-label" for="orderListId">
          ORDER LIST ID
        </label>
        <input
          class="form-input"
          type="text"
          id="orderListId"
          placeholder="XXXX"
        />
        <label class="form-label red" for="buildingId">
          BUILDING ID
        </label>
        <input
          class="form-input font-red"
          type="text"
          id="buildingId"
          placeholder="XXXX"
        />
        <label class="form-label red" for="buildingName">
          BUILDING NAME
        </label>
        <input
          class="form-input font-red"
          type="text"
          id="buildingName"
          placeholder="XXXX"
        />
        <label class="form-label red" for="buildingAddress">
          BUILDING ADDRESS
        </label>
        <input
          class="form-input font-red"
          type="text"
          id="buildingAddress"
          placeholder="XXXX"
        />
      </div>

      <div class="form-row1">
        <label class="form-label1" for="orderDescription">
          ORDER DESCRIPTION
        </label>
        <input
          class="form-input"
          type="text"
          id="orderDescription"
          placeholder="XXXX"
        />
      </div>

      <div className="check">
        <div>
          <button
            onClick={selectAllCheckboxes}
            style={{ width: "90px", backgroundColor: "lightgreen" }}
            type="button"
            class=" btn-primary"
          >
            Select All
          </button>
        </div>

        <div>
          <button
            onClick={deleteSelectedRows}
            style={{ width: "90px", backgroundColor: "red" }}
            type="button"
            class=" btn-danger"
          >
            Delete All
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>checkbox</th>
            <th>TABLE</th>
            <th>
              orderListI
              <br />
              temNrUID
            </th>
            <th>ITEM NR.</th>
            <th>MATERIAL ID</th>
            <th>MAT. DESCRIPTION</th>
            <th>CURRENT QTY</th>
            <th>PREVIOUS QTY</th>
            <th>QTY DIFF</th>
            <th>Order Comment</th>
            <th>
              <button class="btn btn-add" onClick={addItem}>
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((item) => {
            return (
              <tr>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id={item?.id}
                      checked={checkedState.find((data)=> data==item?.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </label>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.id}
                    onChange={(event) => handleChange(item.id, event, "id")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.uid}
                    onChange={(event) => handleChange(item.uid, event, "uid")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.item}
                    onChange={(event) => handleChange(item.item, event, "item")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.mid}
                    onChange={(event) => handleChange(item.mid, event, "mid")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.desc}
                    onChange={(event) => handleChange(item.desc, event, "desc")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.cqty}
                    onChange={(event) => handleChange(item.cqty, event, "cqty")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.pqty}
                    onChange={(event) => handleChange(item.pqty, event, "pqty")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.diff}
                    onChange={(event) => handleChange(item.diff, event, "diff")}
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#ff0" }}
                    type="text"
                    placeholder="XXXX"
                    value={item?.order}
                    onChange={(event) =>
                      handleChange(item.order, event, "order")
                    }
                  />
                </td>
                <td>
                  <button
                    class="btn btn-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div class="form-row2">
        <label class="form-label2" for="orderDescription">
          REMARKS
        </label>
        <input
          class="form-input"
          type="text"
          id="orderDescription"
          placeholder="XXXX"
        />
      </div>

      <div class="container">
        <div class="section">
          <h3>PREP BY</h3>
          <input type="text" placeholder="XXXX" />
          <label>DATE</label>
          <input type="text" placeholder="XXXX" />
          <button onClick={sendForCheck}>SEND FOR CHECK</button>
        </div>

        <div class="section">
          <h3>CHECK BY</h3>
          <input type="text" placeholder="XXXX" />
          <label>DATE</label>
          <input type="text" placeholder="XXXX" />
          <button>SEND FOR APPROVE</button>
        </div>

        <div class="section">
          <h3>APPROVED BY</h3>
          <input type="text" placeholder="XXXX" />
          <label>DATE</label>
          <input type="text" placeholder="XXXX" />
          <button>APPROVE</button>
        </div>
      </div>

      <div id="alertBox" class="custom-alert">SENDED FOR CHECK</div>

      {/* <div className="container1">
        <button className="btn1">DELETE</button>
        <button className="btn2">CANCEL</button>
        <button className="btn3">SAVE</button>
      </div> */}
    </>
  );
}

export default App;
