from app.models import db, User, Product, Image, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    #Product Seed Data

    product1 = Product(
        productName='Sunny in a Bottle', productDescription='The sunny from one piece, in a bottle', price='60', ownerId=1
    )

    product2 = Product(
        productName='Merry in a Bottle', productDescription='The merry from one piece, in a bottle', price='50', ownerId=2
    )

    product3 = Product(
        productName='King of Red Lions in a Bottle', productDescription='The King of Red Lions from Wind Waker, in a bottle', price='40', ownerId=3
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.commit()

    image1 = Image(
        productId=1, url='https://www.dhresource.com/f2/albu/g19/M00/E0/83/rBVap2E7N7WAWdOPAADp7vvOhoU834.jpg'
    )
    image2 = Image(
        productId=2, url='https://cdn1.sugotoys.com.au/images/20220610062407/fantastic-shengyi-sci-one-piece-ship-in-bottle-going-merry-licensed-7-1-1.jpg?strip=all&lossy=1&ssl=1'
    )
    image3 = Image(
        productId=3, url='https://ih1.redbubble.net/image.1867065170.5440/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
