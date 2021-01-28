import React from 'react'
import { Tag } from 'antd'

export const columns = [
  {
    title: "Cidade",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "Experiência",
    dataIndex: "experience",
    key: "experience"
  },
  {
    title: "Tecnologias",
    dataIndex: "techs",
    key: "techs",
    render: tags => (
      <>
        {
          tags.map((tag, i) =>
            <Tag color="#108ee9" key={i} style={{ margin: "0 1px" }}>{tag}</Tag>)
        }
      </>
    )
  }
]