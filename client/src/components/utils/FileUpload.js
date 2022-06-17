import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios';


function FileUpload(props) {
  const [Images, setImages] = useState([])
  let deleteHandler = (item) => {
    const imgIdx = Images.indexOf(item)
    let images = [...Images];
    images.splice(imgIdx,1)
    setImages(images)
    props.refreshFunction(images)
  }
  function dropHandler(files) {
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);
    axios.post(`/api/product/image`, formData, config).then((res) => {
      setImages([...Images, res.data.filePath])
      props.refreshFunction([...Images, res.data.filePath])
    });

  }
  return ( 
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {
        Images.map((item,i) => (
          <div key={i} onClick={() => deleteHandler(item)}>
            <img src={`http://localhost:5000/${item}`} style={{ minWidth: '300px', width: '300px', height: '240px'}}/>  
          </div>
        ))
      }
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className='drop'
              style={{
                width: 300, height: 240, border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default FileUpload