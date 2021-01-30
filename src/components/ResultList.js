import React from 'react'
import { Row, Table } from 'antd'

import { columns } from '../assets/utils/tableColumns'


export const ResultList = ({ list }) => {

  return (
    <Row justify='center'>
      <Table
        columns={columns}
        dataSource={list}
        locale={{ emptyText: 'Nenhum resultado encontrado' }}>
      </Table>
    </Row>
  )
}
