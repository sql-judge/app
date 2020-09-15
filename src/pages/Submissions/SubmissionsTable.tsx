import React from "react";
import { gql, useQuery } from "@apollo/client";
import { HTMLTable, NonIdealState, Tag } from "@blueprintjs/core";
import { DefaultSpinner } from "../../components/Spinners/Spinners";
import { Link } from "react-router-dom";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";

import "./SubmissionsTable.sass";

interface SubmissionsData {
  submissions: {
    id: string;
    problem: {
      id: string;
      title: string;
    };
    created_at: string;
    status: string;
    checker_message: string;
  }[];
}

const GET_SUBMISSIONS = gql`
  query GetSubmissions {
    submissions {
      id
      problem {
        id
        title
      }
      created_at
      status
      checker_message
    }
  }
`;

const statusMessage = new Map([
  ["UNKNOWN", "Статус неизвестен"],
  ["PENDING_CHECK", "Ожидает проверки"],
  ["ACCEPTED", "Решение принято"],
  ["EXECUTION_ERROR", "Ошибка исполнения"],
  ["RESTRICTION_VIOLATED", "Нарушено ограничение"],
  ["INCORRECT_COLUMN_COUNT", "Неверное число столбцов"],
  ["INCORRECT_COLUMN_NAMES", "Неверные имена столбцов"],
  ["INCORRECT_CONTENT", "Неверное множество строк"],
  ["INCORRECT_ROW_ORDER", "Неверный порядок строк"],
]);

const statusIntent = new Map([
  ["UNKNOWN", Intent.NONE],
  ["PENDING_CHECK", Intent.WARNING],
  ["ACCEPTED", Intent.SUCCESS],
  ["EXECUTION_ERROR", Intent.DANGER],
  ["RESTRICTION_VIOLATED", Intent.DANGER],
  ["INCORRECT_COLUMN_COUNT", Intent.DANGER],
  ["INCORRECT_COLUMN_NAMES", Intent.DANGER],
  ["INCORRECT_CONTENT", Intent.DANGER],
  ["INCORRECT_ROW_ORDER", Intent.DANGER],
]);

const SubmissionsTable = () => {
  const { loading, error, data } = useQuery<SubmissionsData>(GET_SUBMISSIONS);

  if (loading)
    return (
      <NonIdealState icon={<DefaultSpinner />} title="Загружаем посылки" />
    );

  if (error)
    return (
      <NonIdealState
        icon="error"
        title="Не удалось загрузить посылки"
        action={<Link to="/problems">Вернуться назад</Link>}
      />
    );

  return (
    <HTMLTable className="submissions-table" bordered interactive striped>
      <thead>
        <tr>
          <th>№</th>
          <th>Задача</th>
          <th>Отправлено</th>
          <th>Статус проверки</th>
          <th>Комментарий</th>
        </tr>
      </thead>
      <tbody>
        {data?.submissions.map((submission) => (
          <tr>
            <td>
              <Link
                title={`Подробнее про посылку №${submission.id}`}
                to={`/submissions/${submission.id}`}
              >
                {submission.id}
              </Link>
            </td>
            <td>
              <Link
                title={`Решить задачу "${submission.problem.title}"`}
                to={`/problems/${submission.problem.id}`}
              >
                {submission.problem.title}
              </Link>
            </td>
            <td>{submission.created_at}</td>
            <td>
              <Tag fill minimal intent={statusIntent.get(submission.status)}>
                {statusMessage.get(submission.status)}
              </Tag>
            </td>
            <td>{submission.checker_message}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};

export default SubmissionsTable;
