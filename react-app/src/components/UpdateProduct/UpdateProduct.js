import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../store/product";
import { updateImg } from "../../store/image";
import { getProduct } from "../../store/product"

function UpdateProduct(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const user = useSelector(state => state.session.user)
  console.log(user)
  const products = useSelector(state => state.products)
  const product = Object.values(products)[0]

  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch])


  const [name, setName] = useState(product.productName)
  const [description, setDescription] = useState(product.productDescription)
  const [price, setPrice] = useState(product.price)
  const [image, setImage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

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

    // const imgPayload = {
    //   productId: newProduct.id,
    //   url: image
    // }

    // let newImg = await dispatch(createImg(imgPayload))
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
        <div>
          <label htmlFor="image">Preview Image</label>
          <input
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UpdateProduct
