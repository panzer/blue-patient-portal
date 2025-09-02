const title = 'Patient Portal';

const apiBaseUrl = 'http://127.0.0.1:8000/';

const email = 'auther-email@gmail.com';

const dateFormat = 'MMMM DD, YYYY';

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

export { loader, dateFormat, email, title, apiBaseUrl };
