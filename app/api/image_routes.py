from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Image, db
from app.forms import ImageForm
from .auth_routes import validation_errors_to_error_messages

image_routes = Blueprint('images', __name__)

@image_routes.route('/create', methods=['POST'])
@login_required
def add_image():
  form = ImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_image = Image()
    form.populate_obj(new_image)

    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict(), 201

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)

    db.session.delete(image)
    db.session.commit()
    return 'Successfully deleted'
