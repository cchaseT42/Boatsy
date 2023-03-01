import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { updateReview } from "../../store/review"
import { getProduct } from "../../store/product"

function UpdateReview({setShowModal, review2}){
  const dispatch = useDispatch()
  let reviewEdit = Object.values(review2)[0]


  const history = useHistory()
  const user = useSelector(state => state.session.user)


  const [validationErrors, setValidationErrors] = useState([])
  const errors = []

  const [stars, setStars] = useState(reviewEdit.stars)
  const [review, setReview] = useState(reviewEdit.review)
  const [color, setColor] = useState('black')


  const click = color => {
    setColor(color)
  }

  useEffect(() => {
    for(let i = 0; i <= stars; i++){
      let item = document.getElementById(`ratingStarsCreate${i}`)
      if (item) item.style.color = color
    }

    for(let i = stars+1; i <= 5; i++){
      let item = document.getElementById(`ratingStarsCreate${i}`)
      if (item) item.style.color = 'black'
    }

  }, [stars])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review) errors.push("Review is Required.")
    if (!stars) errors.push("Stars are Required.")

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
        <div className='stars_div'>
        <div className="inputStar" onClick={(e) => click("yellow")}>
        <span id="ratingStarsCreate1" class="fa fa-star checked" onClick={(e) => setStars(1)}></span>
        </div>
        <div className="inputStar" onClick={(e) => click('yellow')}>
        <span id="ratingStarsCreate2" class="fa fa-star checked" onClick={(e) => setStars(2)}></span>
        </div>
        <div className="inputStar" onClick={(e) => click('yellow')}>
        <span id="ratingStarsCreate3" class="fa fa-star checked" onClick={(e) => setStars(3)}></span>
        </div>
        <div className="inputStar" onClick={(e) => click("yellow")}>
        <span id="ratingStarsCreate4" class="fa fa-star checked" onClick={(e) => setStars(4)}></span>
        </div>
        <div className="inputStar" onClick={(e) => click('yellow')}>
        <span id="ratingStarsCreate5" class="fa fa-star checked" onClick={(e) => setStars(5)}></span>
        </div>
        </div>
        <div className='btndivReview'>
        <button id='submitBtnReview'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateReview
