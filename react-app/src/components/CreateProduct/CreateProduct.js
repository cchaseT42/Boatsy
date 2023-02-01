import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { createProduct } from "../../store/product";
import { createImg } from "../../store/image";
import './CreateProduct.css'

function CreateProduct({setShowModal}){
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) errors.push("Name field is required")
    if (!description) errors.push("Description field is required")
    if (!price) errors.push("Price field is required")
    if (isNaN(price)) errors.push("Price field must be a number")
    if (image && !(image.includes('https' || 'http'))) errors.push("Image url must be a valid web address.")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      ownerId: user.id,
      productName: name,
      productDescription: description,
      price
    }


    let newProduct = await dispatch(createProduct(payload))

    const imgPayload = {
      productId: newProduct.id,
      url: image
    }

    let newImg = await dispatch(createImg(imgPayload))
    setShowModal(false)
    await history.push(`/products/${newProduct.id}`)

  }

  return (
    <div className= "CreateProductForm">
      <form onSubmit={handleSubmit}>
      <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div className='inputDiv'>
          <label htmlFor="name" className='inputName'>Name</label>
          <input
            className='inputArea'
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className='inputDiv'>
          <label htmlFor="description" className='inputName'>Description</label>
          <input
            className='inputArea'
            name="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className='inputDiv'>
          <label htmlFor="price" className='inputName'>Price</label>
          <input
            className='inputArea'
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <div className='inputDiv'>
          <label htmlFor="image" className='inputName'>Preview Image (optional)</label>
          <input
            className='inputArea'
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
        </div>
        <div className='btnDiv'>
        <button id='submitBtn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
