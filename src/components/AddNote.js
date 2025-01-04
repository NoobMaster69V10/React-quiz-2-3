import React, { useState, useEffect } from 'react';
import '../App.css';
import plusLogo from '../images/plus.svg';

function AddNote() {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
          const savedList = JSON.parse(localStorage.getItem("items")) || [];
          setItemList(savedList);
        }, []);

  const handleAddItem = () => {
    if (item.trim() === "") {
      alert("Item cannot be empty!");
      return;
    }
    const updatedList = [...itemList, item];
    setItemList(updatedList);
    localStorage.setItem("items", JSON.stringify(updatedList));
    window.location.href = window.location.href;
  };

  return (
    <>
      <button className='add_note_btn' onClick={toggleModal}>
          <img src={plusLogo}/>
      </button>
      {modal && 
        <div className='add_note'>
          <div className='overlay' onClick={toggleModal}></div>
          <div className='add_note_inner'>
            <div className='add_note_top'>
              <h3>NEW NOTE</h3>
              <input type='text' placeholder='Input your note...' className='add_note_input' value={item}
              onChange={(e) => setItem(e.target.value)}/>
            </div>
            <div className='add_note_actions'>
              <button className='close-btn' onClick={toggleModal}>CANCEL</button>
              <button className='apply-btn' onClick={handleAddItem}>APPLY</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default AddNote;