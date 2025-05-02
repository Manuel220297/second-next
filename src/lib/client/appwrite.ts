import { Client, Account, OAuthProvider } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('student-project'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
export { OAuthProvider };

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(OAuthProvider.Google, 'http://localhost:3000', 'http://localhost:3000/fail');
  } catch (error) {
    console.error(error);
  }
};

export const loginWithGithub = async () => {
  try {
    await account.createOAuth2Session(OAuthProvider.Github, 'http://localhost:3000', 'http://localhost:3000/fail');
  } catch (error) {
    console.error(error);
  }
};
