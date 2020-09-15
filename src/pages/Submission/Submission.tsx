import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface SubmissionProps extends RouteComponentProps<{ id: string }> {}

const Submission: React.FunctionComponent<SubmissionProps> = (
  props: SubmissionProps,
) => {
  const submissionID = props.match.params.id;

  return <div>{submissionID}</div>;
};

export default Submission;
