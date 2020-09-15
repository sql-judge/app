import React, { useState } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import AceEditor from "react-ace";
import { Button, H2, NonIdealState } from "@blueprintjs/core";
import ReactMarkdown from "react-markdown";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DefaultSpinner } from "../../components/Spinners/Spinners";
import TagRow from "../../components/TagRow/TagRow";

import "./Problem.sass";

interface ProblemProps extends RouteComponentProps<{ id: string }> {}

interface ProblemData {
  problem: {
    id: string;
    title: string;
    description: string;
    tags: {
      name: string;
      hex_color: string;
    }[];
  };
}

interface ProblemVars {
  id: string;
}

const GET_PROBLEM = gql`
  query GetProblem($id: ID!) {
    problem(id: $id) {
      id
      title
      description
      tags {
        name
        hex_color
      }
    }
  }
`;

const SUBMIT_SOLUTION = gql`
  mutation AddTodo($problem_id: ID!, $solution: String!) {
    submitSolution(problem_id: $problem_id, solution: $solution) {
      id
    }
  }
`;

const Problem: React.FunctionComponent<ProblemProps> = (
  props: ProblemProps,
) => {
  const history = useHistory();
  const problemID = props.match.params.id;
  const [solution, setSolution] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { loading, error, data } = useQuery<ProblemData, ProblemVars>(
    GET_PROBLEM,
    { variables: { id: problemID } },
  );

  // submission
  const [submitSolution] = useMutation<
    { id: string },
    { problem_id: string; solution: string }
  >(SUBMIT_SOLUTION, {
    variables: {
      problem_id: problemID,
      solution: solution,
    },
  });

  if (loading) {
    return <NonIdealState icon={<DefaultSpinner />} title="Загружаем задачу" />;
  }

  if (error) {
    return (
      <NonIdealState
        icon="error"
        title="Не удалось загрузить задачу"
        // TODO: go back relatively
        action={<Link to="/problems">Вернуться назад</Link>}
      />
    );
  }

  if (redirect) {
    history.push(`/submissions`);
    history.go(0);
  }

  return (
    <div className="problem-content">
      <div className="problem-statement">
        <H2>{data?.problem.title}</H2>
        <div className="problem-tags">
          {data?.problem.tags ? <TagRow tags={data?.problem.tags} /> : ""}
        </div>
        <ReactMarkdown source={data?.problem.description} />
      </div>
      <div className="problem-editor">
        <AceEditor
          width="100%"
          fontSize={16}
          name="problem-editor"
          onChange={(newSolution) => {
            setSolution(newSolution);
          }}
        />
        <Button
          text="Отправить на проверку"
          onClick={() => {
            submitSolution().then((r) => {
              setRedirect(true);
            });
          }}
        />
      </div>
    </div>
  );
};

export default Problem;
