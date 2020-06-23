import React, { ReactElement } from "react";

/* Inline svg to avoid  */
const LOADING_SVG = "data:image/svg+xml,%3Csvg enable-background='new 0 0 40 40' version='1.1' viewBox='0 0 40 40' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m20.201 5.169c-8.254 0-14.946 6.692-14.946 14.946 0 8.255 6.692 14.946 14.946 14.946s14.946-6.691 14.946-14.946c-1e-3 -8.254-6.692-14.946-14.946-14.946zm0 26.58c-6.425 0-11.634-5.208-11.634-11.634 0-6.425 5.209-11.634 11.634-11.634s11.633 5.209 11.633 11.634c0 6.426-5.208 11.634-11.633 11.634z' opacity='.2'/%3E%3Cpath d='m26.013 10.047 1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012v3.312c2.119 0 4.1 0.576 5.812 1.566z'%3E%3CanimateTransform attributeName='transform' attributeType='xml' dur='0.5s' from='0 20 20' repeatCount='indefinite' to='360 20 20' type='rotate'/%3E%3C/path%3E%3C/svg%3E%0A";

const Loader = React.memo((): ReactElement => <img height="36" width="36" src={LOADING_SVG} alt="Loading" />);
export default Loader;