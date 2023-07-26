import { Platform } from 'react-native';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

var accessToken = '';
const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'YOUR_CLIENT_ID',
  redirectUrl: Platform.OS === 'ios' ? 'YOUR_IOS_REDIRECT_URI' : 'YOUR_ANDROID_REDIRECT_URI',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://accounts.google.com/o/oauth2/token',
    revocationEndpoint: 'https://accounts.google.com/o/oauth2/revoke',
  },
};
async function authenticateWithYouTube() {
    try {
      const result = await authorize(config);
      // Save the access token from the result to use for API requests.
      accessToken = result.accessToken;
      console.log('Access Token:', accessToken);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }


async function getUserVideos() {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet',
        mine: true,
        access_token: accessToken,
      },
    });

    console.log('User Videos:', response.data);
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}
