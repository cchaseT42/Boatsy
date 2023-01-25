from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class ImageForm(FlaskForm):
  productId = IntegerField("productId", validators=[DataRequired()])
  url = StringField("url", validators=[DataRequired()])
