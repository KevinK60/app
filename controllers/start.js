'use strict';

// import all required modules
import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';
import accounts from './accounts.js';

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){
        
      const playlists = playlistStore.getAllPlaylists();
      const shortestPlaylist = playlistStore.getShortestPlaylist();
      let shortestPlaylistName = '';
if (shortestPlaylist) {
  shortestPlaylistName = shortestPlaylist.title;
}
     console.log(shortestPlaylist)
      let numPlaylists = playlists.length;
      let numSongs = 0;
      for (let item of playlists) {
        numSongs += item.songs.length;
      }
      let averageSongsPerPlaylist = (numSongs / numPlaylists).toFixed(2);
      const viewData = {
        title: 'Welcome to the Playlist App!',
        totalPlaylists: numPlaylists,
        totalSongs: numSongs,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        averageSongsPerPlaylist: averageSongsPerPlaylist,
        shortestPlaylistName: shortestPlaylistName,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
export default start;