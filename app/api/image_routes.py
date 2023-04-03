from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Image, db
from app.forms import ImageForm
from .auth_routes import validation_errors_to_error_messages
from app.AWSupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_image(id):
  productId = id
  if "image" not in request.files:
        return {"errors": "image required"}, 400

  image = request.files["image"]

  if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)
  upload = upload_file_to_s3(image)


  if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

  url = upload["url"]
  new_image = Image(productId=productId, url=url)
  db.session.add(new_image)
  db.session.commit()
  return {"url": url}


@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)

    db.session.delete(image)
    db.session.commit()
    return 'Successfully deleted'
