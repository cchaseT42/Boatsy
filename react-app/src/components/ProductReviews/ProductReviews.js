import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import './ProductReviews.css'

function ProductReviews(){
  const dispatch = useDispatch()
  const history = useHistory()
  const { productId } = useParams()
}

export default ProductReviews
