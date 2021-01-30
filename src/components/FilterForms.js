import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Select, InputNumber, Button, message } from 'antd'

import { parseTable } from '../assets/utils/parseTable'

const { REACT_APP_GEEK_API } = process.env

const { Option } = Select

export const FilterForms = ({ setList }) => {

  const [locals, setLocals] = useState([])
  const [techs, setTechs] = useState([])

  const [location, setLocation] = useState('')
  const [minimumExperience, setMinimumExperience] = useState(0)
  const [maxExperience, setMaxExperience] = useState(0)
  const [skills, setSkills] = useState([])

  function onChangeLocation(value) {
    setLocation(value)
  }

  function onChangeMin(value) {
    setMinimumExperience(value)
  }

  function onChangeMax(value) {
    setMaxExperience(value)
  }

  function onSelectTech(value) {
    setSkills([...value])
  }

  useEffect(() => {
    async function fetchFilters() {
      const localsTemp = await axios.get(`${REACT_APP_GEEK_API}/locals`);
      const techsTemp = await axios.get(`${REACT_APP_GEEK_API}/techs`);

      setTechs(techsTemp.data.response)
      setLocals(localsTemp.data.response)
    }
    fetchFilters()
  }, [])

  async function sendCandidateFilter() {
    const listResult = await axios.post(`${REACT_APP_GEEK_API}/match`, {
      maxExperience,
      minimumExperience,
      city: location,
      technologies: [
        ...skills
      ]
    })

    if (listResult.error || listResult.data.response.length === 0) {
      message.error('Lamento, nenhum resultado encontrado.')
      setList([])
    } else {
      const parseList = parseTable(listResult.data.response)
      setList(parseList)
    }
  }

  const filteredTechs = techs.filter(o => !skills.includes(o))

  return (
    <Row style={{
      flexDirection: 'column',
      border: '1px solid black',
      padding: 10,
      margin: '10px 10% 10px 10%'
    }}>
      <h3 style={{
        textAlign: 'center'
      }}>Formulário</h3>
      <Row justify='center'>
        <Col xs={12}>
          <span style={{ marginRight: 5 }}>Selecione a localização:</span>
          <Select
            showSearch
            placeholder="Digite e selecione"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            style={{ width: 240 }} onChange={onChangeLocation}>
            {
              locals.length ?
                locals.map((local, index) =>
                  <Option key={index} value={local}>{local}</Option>
                ) :
                null
            }
          </Select>
        </Col>
      </Row>
      <Row justify='center' style={{ height: 50 }}>
        <Col xs={5}>
          <span style={{ marginRight: 5 }}>Mínima experiência:</span>
          <InputNumber style={{ width: 50 }} size='middle' min={0} max={10} defaultValue={minimumExperience} onChange={onChangeMin} />
        </Col>
        <Col xs={7}>
          <span style={{ marginLeft: 5, marginRight: 5 }}>Máxima experiência (opcional):</span>
          <InputNumber style={{ width: 50 }} size='middle' min={0} max={10} defaultValue={maxExperience} onChange={onChangeMax} />
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <span style={{ marginRight: 5 }}>Selecione as tecnologias interessadas:</span>
          <Select
            mode="multiple"
            placeholder="Selecione as tecnológias"
            value={skills}
            onChange={(event) => onSelectTech(event)}
            style={{ width: 400, height: 'auto', minHeight: 50 }}
          >
            {
              filteredTechs.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row justify='center'>
        <Button style={{ margin: 10 }} onClick={() => sendCandidateFilter()}>Enviar</Button>
      </Row>
    </Row>
  )
}
