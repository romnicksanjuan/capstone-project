import React, { useState, useRef, useEffect } from 'react';
import '../css/Dropdown.css';
import { MdDelete } from "react-icons/md";
import DOMAIN from '../config/config';

const Test = ({ items, categoryFunc, categoryValue }) => {
  const [localItems, setLocalItems] = useState(items);
  const [placeholder, setPlaceHolder] = useState(categoryValue);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  console.log("cattt", categoryValue)
  useEffect(() => {
    if (categoryValue !== '') {
      setPlaceHolder(categoryValue)
    } else {
      setPlaceHolder(categoryValue)
    }
  }, [])


  const toggleDropdown = () => {
    menuRef.current.classList.toggle('show');
  };

  const handleSelect = (option) => {
    setPlaceHolder(option);
    toggleDropdown(); // close
    categoryFunc(option);
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



  // add new category
  const newInputCategory = async () => {
    const newCategory = prompt('Enter New Category')

    const response = await fetch(`${DOMAIN}/add-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newCategory })
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(response.statusText)
      return
    }

    console.log(data)
    alert(data.message)
    setLocalItems(data.categories)
  }


  // delete category 
  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Category?')) return;

    try {
      const response = await fetch(`${DOMAIN}/delete-category/${id}`, {
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
            onClick={() => handleSelect(item.category)}
          >
            {item.category}
            <MdDelete
              style={{ float: 'right', color: 'red' }}
              onClick={(e) => {
                e.stopPropagation(); // prevent dropdown from closing
                deleteCategory(item._id);
              }}
              size={20}
            />
          </div>
        ))}
        <div className='dropdown-item center' onClick={() => newInputCategory()}>Add Category</div>
      </div>
    </div>
  );
};

export default Test;
