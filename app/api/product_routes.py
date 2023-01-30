from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Product, User, db
from app.forms import ProductForm, CartForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
  products = Product.query.all()
  return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def product(id):
  product = Product.query.get(id)
  return product.to_dict(), 200

@product_routes.route('/sell', methods=['POST'])
@login_required
def sell_product():
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_product = Product()
    form.populate_obj(new_product)

    db.session.add(new_product)
    db.session.commit()
    return new_product.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
  product = Product.query.get(id)

  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    product.productName = form.data['productName']
    product.productDescription = form.data['productDescription']
    product.price = form.data['price']
    db.session.commit()
    return product.to_dict(), 201
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)

    db.session.delete(product)
    db.session.commit()
    return 'Successfully deleted'
