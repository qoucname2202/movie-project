import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { HomeTemplate } from './templates/';
import { Fragment } from 'react';
// History
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import ScroollTemplate from './templates/ScrollTemplate';
import Home from './pages/Home';
// import Loading from './components/Loading/Loading';

export const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route
            path="/home"
            element={
              <ScroollTemplate>
                <Home />
              </ScroollTemplate>
            }
          />
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
