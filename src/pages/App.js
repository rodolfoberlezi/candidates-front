import React, { useState } from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

import { TopInfos } from '../components/TopInfos'
import { BottomInfos } from '../components/BottomInfos'
import { FilterForms } from '../components/FilterForms'
import { ResultList } from '../components/ResultList'

const { Header, Footer, Content } = Layout

export const App = () => {

  const [list, setList] = useState([])

  return (
    <Layout>
      <Header style={{
        width: '100%',
        padding: 10,
        color: '#6E2B77',
        backgroundColor: '#ffffff',
        display: 'flex',
        height: 80,
        textAlign: 'center',
        justifyContent: 'space-evenly'
      }}>
        <TopInfos />
      </Header>
      <Content style={{
        backgroundColor: '#ffffff',
        color: '#6E2B77',
        height: 'auto',
        padding: '40px 80px 10px 80px',
        margin: '10px 0'
      }}>
        <h2 style={{ textAlign: 'center' }}>Já sabe o que procura? Preencha os campos</h2>
        <FilterForms setList={setList} />
      </Content>
      <Content style={{ width: '100%', display: 'block' }}>
        {list.length ? <ResultList list={list} /> : null}
      </Content>
      {list.length === 0 ?
        <Footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <BottomInfos />
        </Footer>
        : null}
    </Layout >
  )
}
