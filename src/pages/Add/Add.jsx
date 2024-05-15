/* eslint-disable react/prop-types */
import './Add.css'

import { assets } from "../../assets/admin_assets/assets";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: '',
        description: "",
        price: "",
        category: "Salad"
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        // console.log(formData.get("name"));
        console.log(data);
        try {
            const response = await axios.post(`${url}/api/food/add`, formData)
            if (response.status === 200) {
                setData({
                    name: '',
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false)
                console.log(response);
                toast.success(response.data.message)
                // console.log(response);
            }
            else {
                console.log("not successful");
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error)
        }

        // console.log(formData.getAll());
        console.log(data);
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmit}>
                <div className="add-image-upload flex-col">
                    <p className='a b'>
                        Upload Image
                    </p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                    </label>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" name="name" placeholder="Type here" value={data.name} onChange={(e) => setData(pre => {
                        return {
                            ...pre, name: e.target.value
                        }
                    })} />
                </div>
                <div className="add-product-description flex-col a">
                    <p>Product description</p>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData(pre => ({
                            ...pre, [e.target.name]: e.target.value
                        }))}
                        name="description" rows="6" placeholder="Write content here" required>
                    </textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" onChange={(e) => setData(pre => ({
                            ...pre, [e.target.name]: e.target.value
                        }))}>
                            <option value="Salad">
                                Salad
                            </option>
                            <option value="Rolls">
                                Rolls
                            </option>
                            <option value="Desert">
                                Desert
                            </option>
                            <option value="Sandwich">
                                Sandwich
                            </option>
                            <option value="Cake">
                                Cake
                            </option>
                            <option value="Pure Veg">
                                Pure Veg
                            </option>
                            <option value="Pasta">
                                Pasta
                            </option>
                            <option value="Noodles">
                                Noodles
                            </option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>
                            Product price
                        </p>
                        <input type="number" name="price" placeholder="$20"
                            value={data.price}
                            onChange={(e) => setData(pre => ({
                                ...pre, [e.target.name]: e.target.value
                            }))} />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;