import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { HomeTemplate } from './templates/';
import { Fragment, useEffect } from 'react';
// History
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Loading from './components/Loading';

export const history = createBrowserHistory();

function App() {
  useEffect(() => {
    console.log('start project');
    return () => {};
  }, []);
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Loading />
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = HomeTemplate;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
