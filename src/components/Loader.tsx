import React, { ReactElement } from "react";
import LoaderImage from "../images/Loader.svg";

const Loader = React.memo((): ReactElement  => <img src={LoaderImage} alt="Loading" />);
export default Loader;