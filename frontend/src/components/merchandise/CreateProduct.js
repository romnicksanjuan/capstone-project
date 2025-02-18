import React, { useState } from 'react';
import Navbar from '../Navbar';
import style from '../../css/Items.module.css'
function CreateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState(null);

    const [showForm, setShowForm] = useState(false)

    // Handle image file upload
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('image', image)

        try {
            const response = await fetch('http://localhost:3001/create-product', {
                method: 'POST',
                body: formData
            });

            alert('Product added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    const handleButtonClick = () => {
        setShowForm(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
                padding: '30px', height: '500px', width: '400px', gap: '20px'
            }}>


                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ textAlign: 'end' }} onClick={handleButtonClick}>x</button>
                </div>

                <div>
                    <label htmlFor="name">Merchandise Name:</label><br />
                    <input className={style.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="price">Price:</label><br />
                    <input className={style.input} type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                {/* <div>
                        <label htmlFor="category">Category:</label><br />
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ marginLeft: '10px', marginRight: '10px', height: '30px', marginTop: '5px', marginBottom: '10px' }}
                        >
                            <option value="" disabled>
                                -- Choose a Category --
                            </option>
                            <option value="Mouse">Mouse</option>
                            <option value="Keyboard">Keyboard</option>
                            <option value="Headset">Headset</option>
                            <option value="Microphone">Microphone</option>
                            <option value="Speaker">Speaker</option>
                        </select>
                    </div> */}

                <div>
                    <label htmlFor="stock">Stock:</label><br />
                    <input className={style.input} type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>


                <div>
                    <label htmlFor="image">Image:</label><br />
                    <input className={style.input} type="file" onChange={(e) => handleFileChange} />
                </div>

                {/* <div>
                           <label htmlFor="quantity">Quantity:</label><br />
                           <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                         </div> */}

                <button style={{ height: '35px', width: '100%', border: 'none', fontSize: '15px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
        </>

    );
}

export default CreateProduct;
