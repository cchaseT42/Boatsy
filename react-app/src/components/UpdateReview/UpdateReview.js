import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateReview } from "../../store/review"
import { getReview } from "../../store/review"

function UpdateReview(){
  const dispatch = useDispatch()
  const { reviewId } = useParams()
  let reviewEdit

  useEffect(() => {
    dispatch(getReview(reviewId))
  }, [reviewEdit], [dispatch])

  const history = useHistory()
  const reviews = useSelector(state => state.reviews)
  console.log(reviews)

  if (reviews) {
    reviewEdit = reviews
  }
  console.log(reviewEdit)
  const user = useSelector(state => state.session.user)

  // if (reviewId !== reviewEdit.id){
  //   return null
  // }
  console.log(reviewEdit, "edit")

  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const [stars, setStars] = useState(reviewEdit.stars)
  const [review, setReview] = useState(reviewEdit.review)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stars) errors.push("Stars are Required.")
    if (!review) errors.push("Review is Required.")

    if (errors.length) return setValidationErrors(errors)

    const payload = {
      id: reviewId,
      productId: Object.values(reviews)[0].productId,
      userId: user.id,
      stars: Number(stars),
      review
    }

    let updatedReview = await dispatch(updateReview(reviewId, payload))
    await history.push(`/products/${Object.values(reviews)[0].productId}`)
  }


  return (
    <div className="ReviewForm">
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

export default UpdateReview
