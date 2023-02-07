from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import db

class ReviewForm(FlaskForm):
  userId = IntegerField("ownerId", validators=[DataRequired()])
  productId = IntegerField("productId", validators=[DataRequired()])
  stars = IntegerField("stars", validators=[DataRequired()])
  review = StringField("review", validators=[DataRequired()])
