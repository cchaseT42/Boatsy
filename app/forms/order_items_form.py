from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class Order_ItemForm(FlaskForm):
  orderId = IntegerField("userId", validators=[DataRequired()])
  productId = IntegerField("productId", validators=[DataRequired()])
  count = IntegerField("count", validators=[DataRequired()])
