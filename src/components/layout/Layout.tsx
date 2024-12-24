import React from "react";

import Toast from "components/toast/Toast";

import classes from "./Layout.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={classes.Layout}>
      <Toast />
      {children}
    </div>
  );
};

export default Layout;
