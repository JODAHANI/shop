import React, { useEffect,useState } from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;


function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const toggleChecked = (id) => {
        let copy = [...Checked];
        let checkFind = Checked.indexOf(id)
        if(checkFind === -1) copy.push(id)
        else {
            copy.splice(checkFind,1)
        }
        setChecked(copy)
        props.selectFilters(copy)
    }
    const renderCheckBox = () => {
        return props.list.map((value, index) =>
            <React.Fragment key={index} >
                <Checkbox onChange={() => toggleChecked(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span>
            </React.Fragment>
        )
    }


    return (
        <div>
            <Collapse defaultActiveKey={['1']} >
                <Panel header="Continents">
                    {/* <Checkbox>Checkbox</Checkbox> */}
                    {renderCheckBox()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox




