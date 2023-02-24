from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Orders, Order_Items, db
from app.forms import OrderForm, Order_ItemForm
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)

@order_routes.route('/user/<int:userId>')
@login_required
def orders(userId):
    orders = db.session.query(Orders).filter_by(userId = int(userId))
    return orders.to_dict()

@order_routes.route('/<int:id>')
@login_required
def order(id):
    order = Orders.query.get(id)
    return order.to_dict(), 200

@order_routes.route('/create', ['POST'])
@login_required
def create_order():
    form = OrderForm
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_order = Orders()
        form.populate_obj(new_order)

        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@order_routes.route('/<int:id>', ['DELETE'])
@login_required
def delete_order(id):
    order = Orders.query.get(id)
    db.session.delete(order)
    db.session.commit()
    return 'Successfully deleted'

@order_routes.route('/add', ['POST'])
@login_required
def add_item():
    form = Order_ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_item = Order_Items()
        form.populate_obj(new_item)

        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
