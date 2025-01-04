import React, { useState, useEffect } from 'react';
import '../App.css';
import editLogo from '../images/edit.svg'

function UpdateNote(index) {
    const [itemList, setItemList] = useState([]);
    const [modal, setModal] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [inputItem, setInputItem] = useState('');



    useEffect(() => {
            const savedList = JSON.parse(localStorage.getItem("items")) || [];
            setItemList(savedList);
          }, []);

    const toggleModal = (index) => {
        setModal(!modal);
        if (!modal) {
            setCurrentEditIndex(index);
            setInputItem(itemList[index] || '');
        }
    };

    const updateItem = () => {
        if (inputItem.trim() === '') {
            alert('Item cannot be empty!');
            return;
        }

        const updatedList = [...itemList];
        if (currentEditIndex !== null) {
            updatedList[currentEditIndex] = inputItem;
        }

        setItemList(updatedList);
        localStorage.setItem('items', JSON.stringify(updatedList));
        setModal(false);
        setCurrentEditIndex(null);
        window.location.href = window.location.href;
    };
    console.log(index);

    return (
        <>
            <button onClick={() => toggleModal(index)}>
                <img src={editLogo}/>
            </button>

            {modal && 
                <div className='add_note'>
                    <div className='overlay' onClick={toggleModal}></div>
                    <div className='add_note_inner'>
                        <div className='add_note_top'>
                            <h3>UPDATE NOTE</h3>
                            <input type='text' placeholder='Input your note...' className='add_note_input' value={inputItem}
                            onChange={(e) => setInputItem(e.target.value)}/>
                        </div>
                        <div className='add_note_actions'>
                            <button className='close-btn' onClick={toggleModal}>CANCEL</button>
                            <button className='apply-btn' onClick={updateItem}>APPLY</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default UpdateNote;