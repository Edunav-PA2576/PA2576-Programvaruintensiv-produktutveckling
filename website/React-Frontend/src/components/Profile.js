import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
// import { fetchProfile } from "./api";

/*
function Profile() {    Gammal kod som vi inte vill bi av med
  return (
    <>
      <div className="profile-page">
        <div className="left-column">
          <div className="profile-group">
            <div className="profile-container">
              <div className="profile-header">
                <img
                  src="https://i.scdn.co/image/ab6761610000e5eba7874efb5aa08fc40af59c10"
                  alt="Profile"
                  className="profile-pic-large"
                />
                <div className="profile-info">
                  <h1 className="profile-username">Sean Banan</h1>
                  <div className="favorite-genres">
                    <span className="genre">Rock</span>
                    <span className="genre">Progressive-Rock</span>
                    <span className="genre">House</span>
                    <span className="genre">EDM</span>
                  </div>
                </div>
              </div>
              <Link to="/profile-customization">Edit Profile</Link>
            </div>

            <div className="favorite-songs-showcase">
              <div className="favorite-songs-container">
                <h2>Top Songs</h2>
                <ul className="favorite-songs">
                  <iframe
                    src="https://open.spotify.com/embed/track/3rwd5wW9Ew5H6YlyZk9wtH"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                  <iframe
                    src="https://open.spotify.com/embed/track/70LcF31zb1H0PyJoS1Sx1r"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                  <iframe
                    src="https://open.spotify.com/embed/track/6SXy02aTZU3ysoGUixYCz0"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                  <iframe
                    src="https://open.spotify.com/embed/track/0fMqi9V3pulDGq1S62Y0WL"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                  <iframe
                    src="https://open.spotify.com/embed/track/5UuikgHTxSRFRnC0zXx10i"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                  <iframe
                    src="https://open.spotify.com/embed/track/03sEzk1VyrUZSgyhoQR0LZ"
                    width="270"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                </ul>
              </div>

              <div className="showcase">
                <div className="showcase-section">
                  <div className="showcase-section-content">
                    <h2>Albums</h2>
                    <div className="showcase-items">
                      <a href="https://open.spotify.com/album/0u7sgzvlLmPLvujXxy9EeY" target="_blank">
                        <img
                          src="https://i.scdn.co/image/ab67616d0000b273042dbf8721e37f11843bfeac"
                          alt="Album 1"
                          className="showcase-item"
                        />
                      </a>
                      <a href="https://open.spotify.com/album/0NGM3Ftwjw0dLNpAowmz3x" target="_blank">
                        <img
                          src="https://i.scdn.co/image/ab67616d0000b273be6e758fe8300a72eceddb8f"
                          alt="Album 2"
                          className="showcase-item"
                        />
                      </a>
                      <a href="https://open.spotify.com/album/1zcm3UvHNHpseYOUfd0pna" target="_blank">
                        <img
                          src="https://i.scdn.co/image/ab67616d0000b2735405ef9e393f5f1e53b4b42e"
                          alt="Album 3"
                          className="showcase-item"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="showcase-section">
                  <div className="showcase-section-content">
                    <h2>Artists</h2>
                    <div className="showcase-items">
                      <a href="https://open.spotify.com/artist/4KXp3xtaz1wWXnu5u34eVX" target="_blank">
                        <img
                          src="https://i.scdn.co/image/38129832f70d5798de2618faa55182407135842c"
                          alt="Artist 1"
                          className="showcase-item"
                        />
                      </a>
                      <a href="https://open.spotify.com/artist/4bthk9UfsYUYdcFyqxmSUU" target="_blank">
                        <img
                          src="https://i.scdn.co/image/ab6761610000e5eb1e63dea1bded4ae1d53b5c9a"
                          alt="Artist 2"
                          className="showcase-item"
                        />
                      </a>
                      <a href="https://open.spotify.com/artist/0PFtn5NtBbbUNbU9EAmIWF" target="_blank">
                        <img
                          src="https://i.scdn.co/image/ab6761610000e5eba59a5bcab211f964fe9bfb06"
                          alt="Artist 3"
                          className="showcase-item"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="showcase-section">
                  <h2>Badges</h2>
                  <div className="showcase-items">
                    <img src="https://i.scdn.co/image/38129832f70d5798de2618faa55182407135842c" alt="Badge 1" className="showcase-item" />
                    <img src="https://i.scdn.co/image/ab67616d0000b273042dbf8721e37f11843bfeac" alt="Badge 2" className="showcase-item" />
                    <img src="https://i.scdn.co/image/ab67616d0000b2730cd942c1a864afa4e92d04f2" alt="Badge 3" className="showcase-item" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feed">
          <h2>Posts</h2>
          <div className="post">Post 1</div>
          <div className="post">Post 2</div>
          <div className="post">Post 3</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
*/Q




function Profile() {      // Definiera tillstånd för profildata, laddningsstatus och felmeddelanden
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // För att hantera eventuella fel

  useEffect(() => {     // useEffect körs en gång när komponenten laddas
    fetch("http://127.0.0.1:5000/profile", { credentials: 'include' })    // Hämta profildata från backend

      .then((res) => {
        // if (!res.ok) {
        //   return res.json().then((data) => {
        //     throw new Error(data.error || `Server error: ${res.status} ${res.statusText}`);
        //   });
        // }
        // return res.json()
        if (res.status === 401) {
          navigate("/login");   // Om användaren inte är inloggad, navigera till inloggningssidan

          return null;
        }
        return res.json();    // Om allt är OK, returnera JSON-data
      })
      .then((data) => {
        console.log("Fetched profile data:", data);   // Logga datan för felsökning
        setProfile(data);   // Spara profildatan i state
      })
      .catch((error) => {   // Fånga eventuella fel och spara meddelande i state
        console.error("Error fetching profile data:", error);
        setError(error.message || "Failed to load profile data.");
      })
      .finally(() => {    // När allt är klart (oavsett om det lyckades eller inte), sluta visa laddning
        setLoading(false);
      });
  }, []);

  if (loading) {    // Visa laddningsmeddelande medan datan hämtas
    return <div>Loading profile...</div>;
  }

  if (error) {    // Visa felmeddelande om något gick fel
    return <div>Error: {error}</div>;  // Om ett fel inträffade, visa det
  }

  if (!profile) {   // Om ingen profildata hittades
    return <div>Profile not found här</div>;
  }

  return (
    <div className="profile-page">    {/* Profilsidan */}
      <div className="left-column">
        <div className="profile-group">
          <div className="profile-container">
            <div className="profile-header"> 
              <img 
                src={profile.profile_picture || "https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg"}
                alt="Profile"
                className="profile-pic-large"
              />    {/* Profilbild med fallback */}
              <div className="profile-info">
                <h1 className="profile-username">{profile.username || "Unknown User"}</h1>    {/* Användarnamn med fallback */}
                <div className="favorite-genres">   {/* Lista med favoritgenrer eller fallback-text */}
                  {profile.favorite_genres && profile.favorite_genres.length > 0 ? (
                    profile.favorite_genres.map((genre, index) => (
                      <span key={index} className="genre">
                        {genre}
                      </span>
                    ))
                  ) : (
                    <span>No favorite genres</span>
                  )}
                </div>
              </div>
            </div>
            <Link to="/profile-customization">Edit Profile</Link>   {/* Länk till profilredigering */}
          </div>

          <div className="favorite-songs-showcase">   {/* Showcase-sektion för favoritsånger */}
            <div className="favorite-songs-container">
              <h2>Top Songs</h2>
              <ul className="favorite-songs">
                {profile.songs && profile.songs.length > 0 ? (
                  profile.songs.map((song) => (
                    <iframe
                      key={song.song_id}
                      src={song.embed_url}
                      width="270"
                      height="80"
                      frameBorder="0"
                      allow="encrypted-media"
                    ></iframe>
                  ))
                ) : (
                  <p>No songs added</p>
                )}
              </ul>
            </div>

            <div className="showcase">    {/* Showcase-sektion för album */}
              <div className="showcase-section">
                <h2>Albums</h2>
                <div className="showcase-items">
                  {profile.albums && profile.albums.length > 0 ? (
                    profile.albums.map((album) => (
                      <a key={album.album_id} href={album.spotify_url} target="_blank" rel="noopener noreferrer">
                        <img src={album.cover_url} alt={album.title} className="showcase-item" />
                      </a>
                    ))
                  ) : (
                    <p>No albums added</p>
                  )}
                </div>
              </div>

              <div className="showcase-section">    {/* Showcase-sektion för artister */}
                <h2>Artists</h2>
                <div className="showcase-items">
                  {profile.artists && profile.artists.length > 0 ? (
                    profile.artists.map((artist) => (
                      <a key={artist.artist_id} href={artist.spotify_url} target="_blank" rel="noopener noreferrer">
                        <img src={artist.cover_url} alt={artist.name} className="showcase-item" />
                      </a>
                    ))
                  ) : (
                    <p>No artists added</p>
                  )}
                </div>
              </div>

              <div className="showcase-section">    {/* sektion för badges */}
                <h2>Badges</h2>
                <div className="showcase-items">
                  <p>Coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feed">    {/* feed med inlägg */}
        <h2>Posts</h2>
        <div className="post">Post 1</div>
        <div className="post">Post 2</div>
        <div className="post">Post 3</div>
      </div>
    </div>
  );
}

export default Profile;