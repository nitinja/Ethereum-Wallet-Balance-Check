import React, { ReactElement } from "react";
import LoaderImage from "../images/Loader.svg";

export const Loader = (): ReactElement  => <img src={LoaderImage} alt="Loading" />;
export default Loader;