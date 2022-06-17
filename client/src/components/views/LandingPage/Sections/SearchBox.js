import React,{useState} from 'react'
import { Input } from 'antd';
const { Search } = Input;


function SearchBox(props) {
  const [searchValue, setsearchValue] = useState('')
  const searchHandler = (e) => {
    setsearchValue(e.target.value)
    props.refreshFunction(e.target.value)
  }
  return (
    <Search placeholder="input search text"style={{ width: 200, margin : '0.5rem'}} onChange={searchHandler} value={searchValue}/>
  )
}

export default SearchBox

