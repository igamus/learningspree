from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


demo = User(
    name='Demo',
    email='demo@aa.io',
    password='password'
)
marnie = User(
    name='marnie',
    email='marnie@aa.io',
    password='password'
)
bobbie = User(
    name='bobbie',
    email='bobbie@aa.io',
    password='password'
)
buying_andy = User(
    name='andy',
    email='andy@aa.io',
    password='password'
)
dr_octopus = User(
    name='Dr. Otto Octavius',
    email='ooctavius@horizon.edu',
    password='password'
)


def seed_users():
    db.session.add(demo) # 1
    db.session.add(marnie) # 2
    db.session.add(bobbie) # 3
    db.session.add(buying_andy) # 4
    db.session.add(dr_octopus) # 5
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
