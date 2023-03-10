from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class OrderForm(FlaskForm):
  userId = IntegerField("userId", validators=[DataRequired()])
  total = IntegerField("total", validators=[DataRequired()])
  subTotal = IntegerField("subTotal", validators=[DataRequired()])
