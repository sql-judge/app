import React from "react";
import {Intent, Spinner} from "@blueprintjs/core";

import "./Spinners.sass";

export const DefaultSpinner = () => <div className="centered-spinner"><Spinner size={50}/></div>
export const ErrorSpinner = () => <div className="centered-spinner"><Spinner size={50} intent={Intent.DANGER}/></div>

