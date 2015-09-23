"use strict";
import React from "react";

import {Layout} from "react-layout-pane";
import { Header } from "./components/common/header.jsx";
import { Footer } from "./components/common/footer.jsx";

class Index extends React.Component {
  render () {

    let { header, content } = this.props.children;

    if( header === undefined )
      header = <Header />;

    return (
      <Layout type="rows" >
        {header}
        {content || this.props.children}
        <Footer />
      </Layout>
    );
  }
}

export { Index };