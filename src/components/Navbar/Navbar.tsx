import React from "react";
import {
  Alignment,
  Navbar as BlueprintNavbar,
  Tab,
  Tabs,
} from "@blueprintjs/core";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import "./Navbar.sass";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const handleTabChange = (newID: string) => {
    history.replace(`/${newID}`);
  };

  return (
    <BlueprintNavbar fixedToTop>
      <div className="navbar-content">
        <BlueprintNavbar.Group align={Alignment.LEFT}>
          <BlueprintNavbar.Heading className="navbar-title">
            <span>
              <b>SQL</b>judge
            </span>
          </BlueprintNavbar.Heading>
          <Tabs
            id="navbar-tab"
            onChange={handleTabChange}
            selectedTabId={location.pathname.slice(1)}
          >
            <Tab id="problems" title="Задачи" />
            <Tab id="courses" title="Курсы" disabled />
            <Tab id="submissions" title="Посылки" />
          </Tabs>
        </BlueprintNavbar.Group>
        {/*<BlueprintNavbar.Group align={Alignment.RIGHT}>*/}
        {/*  <InputGroup placeholder="Поиск" leftIcon="search" />*/}
        {/*  <Button minimal>Иванов Иван Иванович</Button>*/}
        {/*</BlueprintNavbar.Group>*/}
      </div>
    </BlueprintNavbar>
  );
};

export default withRouter(Navbar);
