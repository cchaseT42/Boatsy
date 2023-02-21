import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../store/product";
import { createImg } from "../../store/image";
import { destroyImg } from "../../store/image";
import { getProduct } from "../../store/product"
import noimage from '../../no_image/No_Image_Available.jpg'
import './UpdateProduct.css'

function UpdateProduct(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const user = useSelector(state => state.session.user)
  const products = useSelector(state => state.products)
  const product = Object.values(products)[0]
  let images = Object.values(product.images)


  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch])


  const [name, setName] = useState(product.productName)
  const [description, setDescription] = useState(product.productDescription)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [imgvalidationErrors, setImgvalidationErrors] = useState([])
  const errors = []
  const imgErrors = []

  const addimgSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("image", image);

    let res = await fetch(`/api/images/${productId}`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      await dispatch(getProduct(productId))
    }
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) errors.push("Name field is required")
    if (name.length > 50) errors.push("Name must be less than 50 characters long.")
    if (!description) errors.push("Description field is required")
    if (description.length > 1000) errors.push("Description must be less than 1000 characters long.")
    if (!price) errors.push("Price field is required")
    if (isNaN(price)) errors.push("Price field must be a number")
    if (price && !isNaN(price) && price < 1) errors.push("Price must be a positive integer")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      ownerId: user.id,
      productName: name,
      productDescription: description,
      price
    }

    setValidationErrors([])


    let updatedProduct = await dispatch(updateProduct(payload, productId))

    history.push(`/products/${productId}`)

  }
  return (
    <div className= "UpdateProductForm">
      <form onSubmit={handleSubmit} className='edit_form'>
      <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div className="edit_input">
          <label className='edit_tag' htmlFor="name">Name</label>
          <input
            className='input_body'
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="edit_input">
          <label className='edit_tag' htmlFor="description">Description</label>
          <input
            className='input_body'
            name="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="edit_input">
          <label className='edit_tag' htmlFor="price">Price</label>
          <input
            className='input_body'
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <div className='btnDiv'>
        <button id='submitBtnEdit'>Submit</button>
        </div>
        </form>
        <div className='images_div'>
        <form className='img_form' onSubmit={addimgSubmit}>
          <p id='or'>
            Or-
          </p>
          <div className='img_form_div'>
          <ul className="errors">
          {imgvalidationErrors.length > 0 && imgvalidationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        {/* <label className='edit_tag' htmlFor="image">Add New Image</label> */}
        <label htmlFor="image" className='inputName'>Add New Image</label>
          <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button id='img_submit_btn'>Add</button>
          </div>
            </form>
          <ul className="images">
            {product.images.length > 0 && Object.values(product.images).map((image) => {
              return (
                <li key={image.id}>
                <div className='delete_img_div'>
                  <img className='img_edit' src={image.url} onError={(e)=>{ if (e.target.src !== noimage)
                    { e.target.onerror = null; e.target.src=noimage; } }} alt='displayimg'></img>
                  <button id='deletebtn' onClick={async e =>{
                    await dispatch(destroyImg(image.id))
                    await dispatch(getProduct(productId))
                  }}>Delete</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  )
}

export default UpdateProduct
