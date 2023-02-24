from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Orders, Order_Items, db
from app.forms import OrderForm, Order_ItemForm
from .auth_routes import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)

@order_routes.route('/<int:id>')
@login_required
def order(id):
    orders = Orders.query
