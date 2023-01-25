import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { createProduct } from "../../store/product";

function CreateProduct(){
  const dispatch = useDispatch()
  const user = useSelector(state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <div className= "CreateProductForm">
      <form onSubmit={handleSubmit}>
      <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
          ))}
        </ul>

      </form>
    </div>
  )
}

export default CreateProduct
