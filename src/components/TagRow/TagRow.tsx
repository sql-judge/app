import React from "react";
import { Tag } from "@blueprintjs/core";

import "./TagRow.sass";

interface TagRowProps {
  tags: { name: string; hex_color: string }[];
}

const TagRow: React.FunctionComponent<TagRowProps> = ({
  tags,
}: TagRowProps) => (
  <div className="tag-row">
    {tags.map((tag, index) => (
      <Tag
        key={index}
        interactive
        style={{ background: tag.hex_color }}
        title={`Показать задачи с тегом "${tag.name}"`}
      >
        {tag.name}
      </Tag>
    ))}
  </div>
);

export default TagRow;
