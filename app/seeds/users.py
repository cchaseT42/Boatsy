from app.models import db, User, Product, Image, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    joseph = User(
        username='joseph', email='joseph@aa.io', password='password')
    johnny = User(
        username='johnny', email='johnny@aa.io', password='password')
    jackie = User(
        username='jackie', email='jackie@aa.io', password='password')
    barnie = User(
        username='barnie', email='barnie@aa.io', password='password')
    jessie = User(
        username='jessie', email='jessie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(joseph)
    db.session.add(johnny)
    db.session.add(jackie)
    db.session.add(barnie)
    db.session.add(jessie)
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

    product4 = Product(
        productName='Ship in a Bottle', productDescription='Just a regular old ship in a Bottle', price='10', ownerId=4
    )

    product5 = Product(
        productName='Lego Ship in a Bottle', productDescription='A Ship in a Bottle made of Legos', price='100', ownerId=5
    )

    product6 = Product(
        productName='Antique Ship in a Bottle', productDescription='A very old ship in a bottle. or maybe its just an old design. Not sure.', price='1000', ownerId=6
    )

    product7=Product(
        productName='Pirate Ship in a Bottle', productDescription='A real pirate ship in a Bottle! The crew is still on there, too.', price='5', ownerId=7
    )

    product8=Product(
        productName="Queen Anne's Revenge in a Bottle", productDescription="The famous Edward Teach's flagship, in a bottle!", price=250, ownerId=8
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
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
    image4 = Image(
        productId=4, url='https://www.marineinsight.com/wp-content/uploads/2019/12/ship-in-bottle-1.png'
    )
    image5 = Image(
        productId=5, url='https://www.lego.com/cdn/cs/set/assets/bltd635f19435bee4e6/21313.jpg'
    )
    image6 = Image(
        productId=6, url='https://fineartshippers.com/wp-content/uploads/2022/05/FASHIPS-2048x2048.jpg'
    )
    image7 = Image(
        productId=7, url='https://cdnb.artstation.com/p/assets/covers/images/049/526/425/large/michael-pavlovich-michael-pavlovich-watershipsquarenotextsmall.jpg?1652714630'
    )
    image8 = Image(
        productId=8, url='https://gonautical.com/3767/blackbeard-s-queen-anne-s-revenge-pirate-ship-in-a-bottle-7.jpg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
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
