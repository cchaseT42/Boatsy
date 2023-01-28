from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Cart, db
from app.forms import CartForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
@login_required
def cart(id):
  carts = Cart.query.all()
  print("all", cart)
  carts = list(filter(lambda cart: cart.userId == id, carts))
  print(carts)
  # cart = db.session.query(Cart).filter(Cart.userId == id)
  return {'cart_items': [cart.to_dict() for cart in carts]}, 200

@cart_routes.route('/add', methods=['POST'])
def add_cart():
  print("hello")
  form = CartForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_cart = Cart()
    form.populate_obj(new_cart)

    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
