import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Web from "./components/Web/Web";
import Tree from "./components/Views/Tree/Tree";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import Help from "./components/Help/Help";
import PrivateRoute from "./PrivateRoute";
import Forgot from "./components/Forgot/Forgot";
import Pro from "./components/Pro/Pro";

function App() {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

  const handleChange = (e) => {
    setCurrentLocale(e.target.value);
    // storing locale in the localstorage
    localStorage.setItem("locale", e.target.value);
  };

  function getInitialLocal() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
  }

  return (
    <Router>
      <IntlProvider
        messages={messages[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={Forgot} />
            <PrivateRoute path="/web/view=board" component={Web} />
            <PrivateRoute path="/web/view=tree" component={Tree} />
            <Route path="/settings" component={Settings} />
            <PrivateRoute path="/profile">
              <Profile
                currentLocale={currentLocale}
                handleChange={handleChange}
              />
            </PrivateRoute>
            <Route path="/help-center" component={Help} />
            <Route path="/pro" component={Pro} />
          </Switch>
        </AuthProvider>
      </IntlProvider>
    </Router>
  );
}

export default App;
