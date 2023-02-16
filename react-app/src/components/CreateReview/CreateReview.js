import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createReview } from "../../store/review"
import './CreateReview.css'

function CreateReview(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
  const user = useSelector(state => state.session.user)
  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const [stars, setStars] = useState('')
  const [review, setReview] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stars) errors.push("Stars are Required.")
    if (!review) errors.push("Review is Required.")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      userId: user.id,
      productId: Number(productId),
      stars: Number(stars),
      review
    }

    let newReview = await dispatch(createReview(payload))
    await history.push(`/products/${productId}`)
  }

  return (
    <div className= "CreateReviewForm">
      <form onSubmit={handleSubmit}>
        <ul className="errors">
        {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>
        <div className='inputDiv'>
          <label htmlFor="Review" className='inputName'>Review</label>
          <input
            className='inputArea'
            name='review'
            type='text'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            />
        </div>
        <div className='inputDiv'>
          <label htmlFor="stars" className='inputName'>Stars</label>
          <input
            className='inputArea'
            name="stars"
            type="textarea"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            />
        </div>
        <div className='btnDiv'>
        <button id='submitBtn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateReview
