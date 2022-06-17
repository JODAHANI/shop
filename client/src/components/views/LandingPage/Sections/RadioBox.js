import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'
const { Panel } = Collapse;

function RadioBox(props) {
    const [Value, setValue] = useState(0)
    const handleChange = (e) => {
        setValue(e.target.value)
        props.selectFilters(e.target.value)
    }
    const renderRadioBox = () => {
        return props.list.map((price) => 
            <Radio key={price._id} value={price._id}>{price.name}</Radio>
        )
    }
    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Price">
                    <Radio.Group onChange={handleChange} value={Value} >
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox