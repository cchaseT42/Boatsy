import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateReview } from "../../store/review"
import { getProduct } from "../../store/product"

function UpdateReview({setShowModal, review2}){
  const dispatch = useDispatch()
  let reviewEdit = Object.values(review2)[0]
  console.log("AAAAAAAAAAAAAAAA", Object.values(review2)[0])


  const history = useHistory()
  // let product = useSelector(state => state.products)
  // product = Object.values(product)[0].reviews

  // product.forEach(ele => {
  //   if (ele.id == reviewId){
  //     return reviewEdit = ele
  //   }
  // })
  const user = useSelector(state => state.session.user)


  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const [stars, setStars] = useState(reviewEdit.stars)
  const [review, setReview] = useState(reviewEdit.review)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review) errors.push("Review is Required.")
    if (!stars) errors.push("Stars are Required.")
    if ((stars && isNaN(stars)) || (stars > 5 || stars < 1)) errors.push("Stars must be an integer between 1 and 5")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      id: reviewEdit.id,
      productId: reviewEdit.productId,
      userId: user.id,
      stars: Number(stars),
      review
    }

    let updatedReview = await dispatch(updateReview(reviewEdit.id, payload))
    setShowModal(false)
    await dispatch(getProduct(reviewEdit.productId))
  }


  return (
    <div className="ReviewForm">
      <form onSubmit={handleSubmit}>
      <ul className="errorsReview">
        {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div className='reviewInputDiv'>
          <label htmlFor="Review" className='inputName'>Review</label>
          <input
            className='inputArea'
            name='review'
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
        </div>
        <div className='reviewInputDiv'>
          <label htmlFor="stars" className='inputName'>Stars</label>
          <input
            className='inputArea'
            name="stars"
            type="textarea"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            />
        </div>
        <div className='btndivReview'>
        <button id='submitBtnReview'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateReview
