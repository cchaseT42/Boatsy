from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    reviews = db.relationship("Reviews", back_populates="user", cascade="all, delete-orphan")
    product = db.relationship("Product", back_populates="user",cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,

        }


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates="product")
    carts = db.relationship("Cart", back_populates="product", cascade='all, delete-orphan')
    reviews = db.relationship("Reviews", back_populates="product", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates="product", cascade="all, delete-orphan")
    favorites = db.relationship("Favorites", back_populates="product", cascade="all, delete-orphan")
    orderItems = db.relationship("OrderItems", back_populates='product', cascade="all, delete-orphan")
    productName = db.Column(db.String, nullable=False)
    productDescription = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(5,2), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'user': self.user.to_dict(),
            'images': [image.to_dict() for image in self.images],
            'reviews': [review.to_dict() for review in self.reviews],
            'reviewAvg': [review.stars for review in self.reviews],
            'productName': self.productName,
            'productDescription': self.productDescription,
            'price': str(self.price)
        }



class Cart(db.Model):
    __tablename__ = 'cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    count = db.Column(db.Integer, nullable=False)

    product = db.relationship("Product", back_populates="carts")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'productId': self.productId,
            'count': self.count,
            'products': self.product.to_dict()
        }

class OrderItems(db.Model):
    __tablename__ = "orderItems"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    orderId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('orders.id')), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    count = db.Column(db.Integer, nullable = False)

    orders = db.relationship("Orders", back_populates="orderItems")

    product = db.relationship("Product", back_populates="orderItems")

    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.orderId,
            'productId': self.productId,
            'count': self.count,
            'products': self.product.to_dict()
        }

class Orders(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    total = db.Column(db.Integer, nullable=False)

    subTotal = db.Column(db.Integer, nullable=False)

    orderItems = db.relationship("OrderItems", back_populates="orders", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'total': self.total,
            'subTotal': self.subTotal,
            'orderItems': [orderItem.to_dict() for orderItem in self.orderItems]
        }


class Reviews(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates="reviews")

    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship("Product", back_populates="reviews")

    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'user': self.user.to_dict(),
            'productId': self.productId,
            'stars': self.stars,
            'review': self.review
        }

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    product = db.relationship("Product", back_populates="images")

    url = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.productId,
            'url': self.url
        }


class Favorites(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)

    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    product = db.relationship("Product", back_populates="favorites")

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.productId,
            'userId': self.userId,
            'products': self.product.to_dict()
        }
