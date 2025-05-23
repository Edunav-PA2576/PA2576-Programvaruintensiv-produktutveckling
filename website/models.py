from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

# Denna fil innehåller databasmodeller för användare, profiler, inlägg, med mera.

def get_uuid():
    """Genererar ett unikt ID med hjälp av UUID4."""
    return uuid4().hex

class User(db.Model, UserMixin):
    """Databasmodell för användare."""
    __tablename__ = 'users'
    user_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    role = db.Column(db.String(10), default='user')

    def __init__(self, username, email, password):
        """Skapar en ny användare med krypterat lösenord."""
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

    # Relationer
    profile = db.relationship("Profiles", back_populates="user", uselist=False, cascade="all, delete-orphan")
    posts = db.relationship('Post', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    oauth = db.relationship('OAuth', back_populates='user', cascade="all, delete-orphan")

    def check_password(self, password):
        """Kontrollerar om lösenordet stämmer med det hashade."""
        return check_password_hash(self.password, password)

    def get_id(self):
        """Returnerar användarens ID, används av Flask-Login."""
        return str(self.user_id)

    def __repr__(self):
        """Representerar användaren som sträng."""
        return f'<User {self.username}>'

class OAuth(db.Model, OAuthConsumerMixin):
    """Lagrar OAuth-information kopplad till en användare."""
    __tablename__ = 'oauth'
    user_id = db.Column(db.String, db.ForeignKey('users.user_id', ondelete="CASCADE"))
    user = db.relationship(User)

class Profiles(db.Model):
    """Profiler kopplade till användare."""
    __tablename__ = 'profiles'
    profile_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id', ondelete="CASCADE"), unique=True, nullable=False)
    bio = db.Column(db.String(500), nullable=True)
    profile_picture = db.Column(db.String, nullable=True, default="https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg")
    favorite_genres = db.Column(db.JSON, nullable=True)

    # Relationer
    user = db.relationship("User", back_populates="profile")
    songs = db.relationship("ProfileSong", back_populates="profile", cascade="all, delete-orphan")
    albums = db.relationship("ProfileAlbum", back_populates="profile", cascade="all, delete-orphan")
    artists = db.relationship("ProfileArtist", back_populates="profile", cascade="all, delete-orphan")

class Post(db.Model):
    """Inlägg som användare kan skapa, med valfritt kopplat innehåll."""
    __tablename__ = 'posts'
    post_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'), nullable=False)
    song_id = db.Column(db.String, db.ForeignKey('songs.song_id'), nullable=True)
    album_id = db.Column(db.String, db.ForeignKey('albums.album_id'), nullable=True)
    artist_id = db.Column(db.String, db.ForeignKey('artists.artist_id'), nullable=True)
    caption = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # Relationer
    user = db.relationship('User', back_populates='posts')
    song = db.relationship('Song', back_populates='posts')
    album = db.relationship('Album', back_populates='posts')
    artist = db.relationship('Artist', back_populates='posts')
    likes = db.relationship('Like', back_populates='post', cascade="all, delete-orphan")
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")

class Like(db.Model):
    """Gillar-funktion för inlägg."""
    __tablename__ = 'likes'
    like_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable=False)

    # Relationer
    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')

class Comment(db.Model):
    """Kommentarer som användare kan lämna på inlägg."""
    __tablename__ = 'comments'
    comment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    # Relationer
    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

class Song(db.Model):
    """Information om en låt."""
    __tablename__ = 'songs'
    song_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    album = db.Column(db.String, nullable=True)
    cover_url = db.Column(db.String, nullable=True)
    spotify_url = db.Column(db.String, nullable=False)
    embed_url = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='song', cascade="all, delete-orphan")

class ProfileSong(db.Model):
    """Länkar en profil till en låt."""
    __tablename__ = 'profile_songs'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.profile_id', ondelete="CASCADE"), nullable=False)
    song_id = db.Column(db.String, db.ForeignKey('songs.song_id', ondelete="CASCADE"), nullable=False)

    profile = db.relationship("Profiles", back_populates="songs")
    song = db.relationship("Song", backref="profile_songs")

class Album(db.Model):
    """Information om ett album."""
    __tablename__ = 'albums'
    album_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    cover_url = db.Column(db.String, nullable=True)
    spotify_url = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='album', cascade="all, delete-orphan")

class ProfileAlbum(db.Model):
    """Länkar en profil till ett album."""
    __tablename__ = 'profile_albums'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.profile_id', ondelete="CASCADE"), nullable=False)
    album_id = db.Column(db.String, db.ForeignKey('albums.album_id', ondelete="CASCADE"), nullable=False)

    profile = db.relationship("Profiles", back_populates="albums")
    album = db.relationship("Album", backref="profile_songs")

class Artist(db.Model):
    """Information om en artist."""
    __tablename__ = 'artists'
    artist_id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cover_url = db.Column(db.String, nullable=True)
    spotify_url = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='artist', cascade="all, delete-orphan")

class ProfileArtist(db.Model):
    """Länkar en profil till en artist."""
    __tablename__ = 'profile_artists'
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.profile_id', ondelete="CASCADE"), nullable=False)
    artist_id = db.Column(db.String, db.ForeignKey('artists.artist_id', ondelete="CASCADE"), nullable=False)

    profile = db.relationship("Profiles", back_populates="artists")
    artist = db.relationship("Artist", backref="profile_songs")

#framtida implementationer som vi jobbar på

    # following = db.relationship(
    #     'User', secondary=followers,
    #     primaryjoin=(followers.c.followerId == user_id),
    #     secondaryjoin=(followers.c.followingId == user_id),
    #     backref=db.backref('followers', lazy='dynamic'),
    #     lazy='dynamic'
    # )

    # def follow(self, user):
    #     if not self.is_following(user):
    #         self.following.append(user)

    # def unfollow(self, user):
    #     if self.is_following(user):
    #         self.following.remove(user)

    # def is_following(self, user):
    #     return self.following.filter(followers.c.followingId == user.user_id).count() > 0

# followers = db.Table(
#     'followers',
#     db.Column('followerId', db.Integer, db.ForeignKey('users.user_id', ondelete="CASCADE"), primary_key=True),
#     db.Column('followingId', db.Integer, db.ForeignKey('users.user_id', ondelete="CASCADE"), primary_key=True)
# )

# Valideringsfunktion för att säkerställa att ett inlägg bara innehåller en typ av innehåll
def validate_content(self):
    """
    Validerar att ett inlägg inte har fler än en typ av innehåll (låtar, album eller artist).
    """
    content_count = sum(1 for content in [self.song_id, self.album_id, self.artist_id] if content)
    if content_count > 1:
        raise ValueError("Ett inlägg kan endast innehålla en typ av innehåll: Låt, Album eller Artist.")
