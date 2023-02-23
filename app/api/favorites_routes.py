from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Favorites, db
from app.forms import FavoritesForm
from .auth_routes import validation_errors_to_error_messages

favorites_routes = Blueprint('favorites', __name__)

@favorites_routes.route('/<int:id>')
@login_required
def favorites_list(id):
    favorites = Favorites.query.all()
    favorites = list(filter(lambda favorites: favorites.userId == id, favorites))

    return {'favorite_items': [favorite.to_dict() for favorite in favorites]}, 200

@favorites_routes.route('/add', methods=['POST'])
def add_favorite():
    form = FavoritesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_favorite = Favorites()
        form.populate_obj(new_favorite)

        db.session.add(new_favorite)
        db.session.commit()
        return new_favorite.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@favorites_routes.route('/<int:userId>/<int:productId>', methods=['DELETE'])
def delete_favorite(userId, productId):

    favorite = db.session.query(Favorites).filter_by(userId = int(userId), productId = int(productId)).first()
    # favorites = Favorites.query.all()
    # favorites = list(filter(lambda favorites: favorites.userId == userId, favorites))
    # favorites = list(filter(lambda favorites: favorites.productId == productId, favorites))
    # print(favorites[0], "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    db.session.delete(favorite)
    db.session.commit()
    return 'Successfully deleted'
