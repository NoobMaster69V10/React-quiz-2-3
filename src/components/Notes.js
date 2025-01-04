import React, { useState, useEffect } from 'react';
import '../App.css';
import deleteLogo from '../images/delete.svg'
import searchLogo from '../images/search-logo.svg'
import moonLogo from '../images/moon.svg'
import emptyNotes from '../images/empty-notes.svg'
import editLogo from '../images/edit.svg'
import Dropdown from './Dropdown';
import Checkmark from './Checkmark';

function Notes() {
    const [itemList, setItemList] = useState([]);
    const [query, setQuery] = useState(''); 
    
    const [modal, setModal] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [inputItem, setInputItem] = useState('');

    useEffect(() => {
        const savedList = JSON.parse(localStorage.getItem("items")) || [];
        setItemList(savedList);
      }, []);

    const deleteItem = (event) => {
        const index = event.currentTarget.dataset.value;
        itemList.splice(index, 1);
        setItemList(itemList);
        localStorage.setItem("items", JSON.stringify(itemList));
        window.location.href = window.location.href;
    } 

    const filteredData = itemList.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
        );



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

    return (
        <>
            <header className='header'>
                <div className='header_inner'>
                    <div className='header_top'>
                        <h1>TODO LIST</h1>
                    </div>
                    <div className='header_bottom'>
                        <div className='search_field'>
                            <input type='text' value={query} id='searchInput' onChange={(e) => setQuery(e.target.value)} className='search_input' placeholder='Search note...'/>
                            <img src={searchLogo} className='search_logo'/>
                        </div>

                        <Dropdown/>

                        <button className='theme_mode_btn'>
                            <img src={moonLogo}/>
                        </button>
                    </div>
                </div>
            </header>

            <div className='notes'>
                {
                    itemList.length == 0 && 
                    <div className='empty_notes'>
                        <img src={emptyNotes} />
                        <h3>Empty...</h3>
                    </div>
                }    
                
                {query.length > 0 ?
                
                    filteredData.map((item)=>(
                        <div className='notes_item'>
                            <div className='notes_left'>
                                <Checkmark item={item}/>
                                <h2>{item}</h2>
                            </div>
                            <div className='note_actions'>
                                <button onClick={() => toggleModal(itemList.indexOf(item))}>
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
                                <button data-value={itemList.indexOf(item)} onClick={deleteItem}>
                                    <img src={deleteLogo}/>
                                </button>
                            </div>
                        </div>))
                
                : itemList.map((item, index)=>(
                    <div className='notes_item'>
                        <div className='notes_left'>
                            <Checkmark item={item}/>
                            <h2>{item}</h2>
                        </div>
                        <div className='note_actions'>
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
                            <button data-value={index} onClick={deleteItem}>
                                <img src={deleteLogo}/>
                            </button>
                        </div>
                    </div>
                    ))}
            </div>
        </>
    );
}

export default Notes;