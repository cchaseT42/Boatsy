from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class FavoritesForm(FlaskForm):
  productId = IntegerField("productId", validators=[DataRequired()])
  userId = IntegerField("userId", validators=[DataRequired()])
