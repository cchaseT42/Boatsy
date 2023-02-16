from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Reviews, db
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('review', __name__)

@review_routes.route('/<int:id>')
def review(id):
  review = Reviews.query.get(id)
  return review.to_dict(), 200

@review_routes.route('/create', methods=['POST'])
@login_required
def add_review():
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_review = Reviews()
    form.populate_obj(new_review)

    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
  review = Reviews.query.get(id)

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review.stars = form.data['stars']
    review.review = form.data['review']
    db.session.commit()
    return review.to_dict(), 201
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Reviews.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return 'Successfully deleted'
