from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class ProductForm(FlaskForm):
  ownerId = IntegerField("ownerId", validators=[DataRequired()])
  productName = StringField("productName", validators=[DataRequired()])
  productDescription = StringField("productDescription", validators=[DataRequired()])
  price = DecimalField("price", validators=[DataRequired()])
