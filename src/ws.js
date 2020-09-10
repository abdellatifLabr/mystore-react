import userProvider from './providers/user.provider';
import notificationProvider from './providers/core/notifications.provider';

export default async function connect() {
  const ws = new WebSocket(`${process.env.REACT_APP_WS_ENDPOINT}/notifications`);

  ws.onopen = async e => {
    console.log('open', e);
   
    let currToken = localStorage.getItem('access');

    if (!currToken) return;

    if (userProvider.isTokenExpired(currToken)) {
      let { success, token, errors } = await userProvider.refreshToken()

      if (success) {
        localStorage.setItem('access', token);
        currToken = token;
      }
      
      if (errors) userProvider.signOut();
    }

    ws.send(
      JSON.stringify({
        type: 'auth',
        text: currToken
      })
    );
  };

  ws.onmessage = e => {
    console.log('message', e);

    let message = JSON.parse(e.data).text;

    switch (message.type) {
      case 'notification':
        notificationProvider.show(message.data);
        break;
    
      default:
        break;
    }
  };

  ws.onerror = e => console.log('error', e);

  ws.onclose = e => console.log(e);

  window.onbeforeunload = () => {
    ws.close();
  }
}