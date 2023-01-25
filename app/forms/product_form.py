from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class ProductForm(FlaskForm):
  productName = StringField("productName", validators=[DataRequired()])
  productDescription = StringField("productDescription", validators=[DataRequired()])
  price = IntegerField("price", validators=[DataRequired()])
