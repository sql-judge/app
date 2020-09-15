import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { HTMLTable, NonIdealState } from "@blueprintjs/core";
import { DefaultSpinner } from "../../components/Spinners/Spinners";
import TagRow from "../../components/TagRow/TagRow";

import "./ProblemsTable.sass";

interface ProblemsData {
  problems: {
    id: string;
    title: string;
    tags: {
      name: string;
      hex_color: string;
    }[];
  }[];
}

const GET_PROBLEMS = gql`
  query GetProblems {
    problems {
      id
      title
      tags {
        name
        hex_color
      }
    }
  }
`;

const ProblemsTable = () => {
  const { loading, error, data } = useQuery<ProblemsData>(GET_PROBLEMS);

  if (loading)
    return <NonIdealState icon={<DefaultSpinner />} title="Загружаем задачи" />;

  if (error)
    return (
      <NonIdealState
        icon="error"
        title="Не удалось загрузить задачи"
        action={<Link to="/problems">Вернуться назад</Link>}
      />
    );

  return (
    <HTMLTable className="problems-table" bordered interactive striped>
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Теги</th>
        </tr>
      </thead>
      <tbody>
        {data?.problems.map((problem, index) => (
          <tr key={index}>
            <td>{problem.id}</td>
            <td>
              <Link
                title={`Решить задачу "${problem.title}"`}
                to={`/problems/${problem.id}`}
              >
                {problem.title}
              </Link>
            </td>
            <td>{problem.tags ? <TagRow tags={problem.tags} /> : ""}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};

export default ProblemsTable;
