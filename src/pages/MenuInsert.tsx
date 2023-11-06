import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  message,
  Input,
  Radio,
} from 'antd';
import { JSX } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import {
  HomeOutlined,
  RollbackOutlined
} from '@ant-design/icons';

export const MenuInsert =  ():JSX.Element => {
    const navigate = useNavigate();

    const MainPage = () => {
        navigate("/");
        };  

    const MenuListPage = () => {
        navigate("/menu");
        };  

const onFinish =  (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};






const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type FieldType = {
  menuname?: string;
  menucorner?: string;
  menuprice?: number;
  menupack?: number;
  menuimage?: string;
};


  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('./menuinsert', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

return (
    <body>
        <div className='content'>
            <div className='btnArea'>
    <Space>
    <HomeOutlined onClick={MainPage} />
    <RollbackOutlined onClick={MenuListPage}/>
  </Space>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"  >


            <Form.Item<FieldType>
            label="이름"
            id="menuname"
            name="menuname"
            rules={[{ required: true, message: '메뉴이름을 입력해 주세요.' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<FieldType>
            label="코너"
            name="menucorner"
            id="menucorner"
            rules={[{ required: true, message: '코너종류을 클릭해 주세요.' }]}>
           <Radio.Group>
            <Radio value="S"> S </Radio>
            <Radio value="B"> B </Radio>
            <Radio value="F"> F </Radio>
            </Radio.Group>
            </Form.Item>

            <Form.Item<FieldType>
              label="가격"
              id="menuprice"
              name="menuprice"
              rules={[{ required: true, message: '메뉴가격을 입력해 주세요.' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<FieldType>
            label="포장가능"
            id="menupack"
            name="menupack"
            rules={[{ required: true, message: '포장여부를 클릭해 주세요.' }]}>
           <Radio.Group>
            <Radio value="1"> O </Radio>
            <Radio value="0"> X </Radio>
            </Radio.Group>
            </Form.Item>

            <Form.Item<FieldType>
            label="이미지"
            id="menuimage"
            name="menuimage"
            rules={[{ required: true, message: '메뉴이미지를 업로드해 주세요.' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<FieldType>
            label="이미지"
            valuePropName="fileList" getValueFromEvent={normFile}>
            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
        
          
          </Form.Item>

          
          
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
        </div>
    </div>
  </body>
);

}