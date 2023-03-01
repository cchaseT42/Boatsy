from app.models import db, User, Product, Image, Reviews, Orders, OrderItems, Favorites, environment, SCHEMA


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
        productName='Sunny in a Bottle', productDescription='The sunny from one piece, in a bottle', price=59.99, ownerId=2
    )

    product2 = Product(
        productName='Merry in a Bottle', productDescription='The merry from one piece, in a bottle', price=49.99, ownerId=3
    )

    product3 = Product(
        productName='King of Red Lions in a Bottle', productDescription='The King of Red Lions from Wind Waker, in a bottle', price=39.99, ownerId=4
    )

    product4 = Product(
        productName='Ship in a Bottle', productDescription='Just a regular old ship in a Bottle', price=9.99, ownerId=5
    )

    product5 = Product(
        productName='Lego Ship in a Bottle', productDescription='A Ship in a Bottle made of Legos', price=99.99, ownerId=6
    )

    product6 = Product(
        productName='Antique Ship in a Bottle', productDescription='A very old ship in a bottle. or maybe its just an old design. Not sure.', price=999.99, ownerId=7
    )

    product7=Product(
        productName='Pirate Ship in a Bottle', productDescription='A real pirate ship in a Bottle! The crew is still on there, too.', price=5.99, ownerId=8
    )

    product8=Product(
        productName="Queen Anne's Revenge in a Bottle", productDescription="The famous Edward Teach's flagship, in a bottle!", price=220.99, ownerId=2
    )

    product9=Product(
        productName="San Juan Miniature in a Bottle", productDescription="The famous Spanish ship, in a bottle!", price=250.99, ownerId=3
    )

    product10=Product(
        productName="MayFlower in a Bottle", productDescription="Sail to the new world, in a bottle!", price=16.20, ownerId=4
    )

    product11=Product(
        productName="The Titanic in a Bottle", productDescription="The famous doomed ship, in a bottle!... A little morbid, if you ask me.", price=19.12, ownerId=5
    )

    product12=Product(
        productName="BattleShip in a Bottle", productDescription="Go to war with this bottle!", price=19.45, ownerId=6
    )

    product13=Product(
        productName="Ship outside of a bottle", productDescription="Not in the bottle yet! Put it in there yourself!", price=12.98, ownerId=7
    )

    product14=Product(
        productName="Ship in a corked bottle", productDescription="Had to put the cork on because the ship kept trying to get out. Willing to negotiate, Don't want this in my house anymore. In a bottle.", price=00.99, ownerId=8
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)

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
    image9 = Image(
        productId=9, url='https://i.etsystatic.com/30660744/r/il/be8a92/3255887671/il_fullxfull.3255887671_8zab.jpg'
    )
    image10 = Image(
        productId=10, url='https://m.media-amazon.com/images/I/41XC5pnLi4L._AC_.jpg'
    )
    image11 = Image(
        productId=11, url='https://i.pinimg.com/736x/a5/23/f3/a523f38b5a0d1f311782a78e8c84e01c--titanic-ship-nautical.jpg'
    )
    image12 = Image(
        productId=12, url='https://i.pinimg.com/736x/a5/38/a9/a538a9fca82d418ddfe490c9774ed37e--battleship-caravan.jpg'
    )
    image13 = Image(
        productId=13, url='https://files.cults3d.com/uploaders/17358497/illustration-file/a3c7204a-5520-4893-80d1-14c865ac61d3/KakaoTalk_20210703_022601392.jpg'
    )
    image14 = Image(
        productId=14, url='https://m.media-amazon.com/images/I/611OtXGW5zL._AC_UF894,1000_QL80_.jpg'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.commit()


    order1 = Orders(
        userId=1, total=5, subTotal=1500
    )

    order2 = Orders(
        userId=1, total=1, subTotal=700
    )

    order_item1 = OrderItems(
        orderId = 1, productId = 2, count = 2
    )

    order_item2 = OrderItems(
        orderId=1, productId = 1, count=3
    )

    order_item3 = OrderItems(
        orderId=2, productId=6, count=1
    )

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order_item1)
    db.session.add(order_item2)
    db.session.add(order_item3)
    db.session.commit()


    review1 = Reviews(
        userId=4, productId=1, stars=5, review="I love it. Great ship"
    )
    review2 = Reviews(
        userId=3, productId=1, stars=2, review="Didn't last very long. Sunk to the bottom of the ocean after a few months."
    )

    db.session.add(review1)
    db.session.add(review2)
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
