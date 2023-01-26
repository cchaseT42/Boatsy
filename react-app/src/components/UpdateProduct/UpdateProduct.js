import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../store/product";
import { createImg } from "../../store/image";
import { destroyImg } from "../../store/image";
import { getProduct } from "../../store/product"

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

  // const destroyImg = async () => {
  //   await dispatch(destroyImg(imgId)).then(() => history.push('/'))
  // }


  const [name, setName] = useState(product.productName)
  const [description, setDescription] = useState(product.productDescription)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const addimgSubmit = async (e) => {
    e.preventDefault()

    const imgPayload = {
      productId,
      url: image
    }

    let newImg = await dispatch(createImg(imgPayload))
    history.push(`/products/${productId}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <form onSubmit={handleSubmit}>
      <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <button>Submit</button>
        </form>
        <form onSubmit={addimgSubmit}>
        <label htmlFor="image">Add New Image</label>
          <input
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
            <button>Add New Image</button>
            </form>
        <div>
          <ul className="images">
            {product.images.length > 0 && Object.values(product.images).map((image) => {
              return (
                <li key={image.id}>
                  <img className="img" src={image.url} alt=''></img>
                  <button onClick={async e =>{
                    await dispatch(destroyImg(image.id))
                    await dispatch(getProduct(productId))
                  }}>Delete</button>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  )
}

export default UpdateProduct
