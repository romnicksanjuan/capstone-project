import React, { useState, useRef, useEffect } from 'react';
import '../css/Dropdown.css';
import { MdDelete } from "react-icons/md";
import DOMAIN from '../config/config';

const Item_Type = ({ items, itemFunction, itemValue }) => {
    const [localItems, setLocalItems] = useState(items);
    const [placeholder, setPlaceHolder] = useState(itemValue);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    console.log("itemValue", itemValue)
    useEffect(() => {
        if (itemValue !== '') {
            setPlaceHolder(itemValue)
        } else {
            setPlaceHolder(itemValue)
        }
    }, [])


    const toggleDropdown = () => {
        menuRef.current.classList.toggle('show');
    };

    const handleSelect = (option) => {
        setPlaceHolder(option);
        toggleDropdown(); // close
        itemFunction(option);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                menuRef.current.classList.remove('show');
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);



    // add new type item
    const newInputType = async () => {
        const type = prompt('Enter New Accessory Type')

        const response = await fetch(`${DOMAIN}/add-accessory-type`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type })
        })
        const data = await response.json()
        if (!response.ok) {
            console.log(data.message)
            return
        }

        console.log(data)
        alert(data.message)
        setLocalItems(data.type)
    }


    // delete category 
    const deleteItemType = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Accessory Type?')) return;

        try {
            const response = await fetch(`${DOMAIN}/delete-accessory/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                return console.log(response.statusText);
            }

            const data = await response.json();
            alert(data.message);

            // Update local state
            setLocalItems((prev) => prev.filter((i) => i._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button type='button' className="dropdown-toggle" onClick={() => toggleDropdown()}>
                {placeholder}
            </button>
            <div className="dropdown-menu" ref={menuRef}>
                {localItems?.map((item) => (
                    <div
                        key={item._id}
                        className="dropdown-item"
                        onClick={() => handleSelect(item.type)}
                    >
                        {item.type}
                        <MdDelete
                            style={{ float: 'right', color: 'red' }}
                            onClick={(e) => {
                                e.stopPropagation(); // prevent dropdown from closing
                                deleteItemType(item._id);
                            }}
                            size={20}
                        />
                    </div>
                ))}
                <div className='dropdown-item center' onClick={() => newInputType()}>Add Item Type</div>
            </div>
        </div>
    );
};

export default Item_Type;
