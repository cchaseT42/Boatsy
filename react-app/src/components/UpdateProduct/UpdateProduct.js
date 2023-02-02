import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../store/product";
import { createImg } from "../../store/image";
import { destroyImg } from "../../store/image";
import { getProduct } from "../../store/product"
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
  const errors = []

  const addimgSubmit = async (e) => {
    e.preventDefault()

    if (image && !(image.includes('https' || 'http'))) errors.push("Image url must be a valid web address.")
    if (errors.length) return setValidationErrors(errors)

    const imgPayload = {
      productId,
      url: image
    }



    let newImg = await dispatch(createImg(imgPayload))

    await dispatch(getProduct(productId))
  }

  const addImg_handlesubmit = async (e) => {

    if (image && !(image.includes('https' || 'http'))) errors.push("Image url must be a valid web address.")
    if (errors.length) return setValidationErrors(errors)

    const imgPayload = {
      productId,
      url: image
    }



    let newImg = await dispatch(createImg(imgPayload))

    await dispatch(getProduct(productId))

  }

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
        <label className='edit_tag' htmlFor="image">Add New Image</label>
          <input
            className='input_body'
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
            <button id='img_submit_btn'>Add</button>
          </div>
            </form>
          <ul className="images">
            {product.images.length > 0 && Object.values(product.images).map((image) => {
              return (
                <li key={image.id}>
                <div className='delete_img_div'>
                  <img className="img_edit" src={image.url} alt=''></img>
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
