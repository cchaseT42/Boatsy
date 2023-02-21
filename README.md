# Boatsy

## Description
Boatsy is an app for selling ships in bottles! the functionality and
appearance are loosely based on Etsy!

## Live Site Link

https://boatsy.onrender.com/

## Technologies/Framesworks Used

1. Javascript
2. React
3. Redux
4. Python
5. SQLAlchemy
6. wtforms
7. Alembic
8. Flask

## MVP Core Features

###### Products
1. Users can list products for sale
2. Users can view all products for sale
3. Users can edit or delete products they have put up for sale.

###### Cart
1. Users can add products to their cart
2. Users can view their cart
3. Users can adjust quantities of products in their cart
4. Users can remove products from their cart.


![](https://media.discordapp.net/attachments/762125768314454027/1070843988900323398/image.png?width=1374&height=671)
![](https://media.discordapp.net/attachments/762125768314454027/1070844049830973560/image.png?width=1280&height=671)
![](https://media.discordapp.net/attachments/762125768314454027/1070844112774901851/image.png?width=1340&height=671)

## Future Implementation Goals

###### Orders
1. Users can create orders by checking out from their cart
2. Users can view their orders from an orders page
3. Users can edit their orders or cancel(delete) them.

###### Reviews
1. Users can review products
2. Users can view all reviews for an individual product
3. Users can edit their review
4. Users can delete their review

###### AWS Implementation
Users can upload a file for an image instead of pasting a url.

###### Favorites
1. Users can favorite items
2. Users can view their favorites from a favorites page
3. Users can remove items from their favorites


## Technical difficulties

###### Implementing a cart feature
I've never worked on a cart feature before. the solution I found is rather inelegant and subject to change. I saved the cart object with a count value and initialized it to 1. Every time you add an item to your cart it checks to see if an item with that id already exists, and if it does, it calls edit instead of create, which will increment the counter by one. removing an item from the cart is identical, but instead of incrementing is decrements. If the count is below or equal to one, delete is called, which will remove that item from the cart.

```javascript
<button className='cart_button' onClick={e => addtoCart(product.id, product.productId)}>Add</button>
<span id='amount_p'> Amount {product.count}</span>
<button className='cart_button' onClick={product.count > 1 ? e => (removefromCart(product.id, product.productId)) : 
e => deletefromCart(product.id) }>Remove</button>
</div>
```
