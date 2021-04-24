import { Layout, Menu, Modal, Button } from 'antd';
import { SnippetsOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {  addFolder } from '../actions/file';
import { useSelector } from 'react-redux';
import '../User.css';
import '../App.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const UserComponent = () => {
  const currentUser = useSelector(state => state.authReducer).user;

  const [folderName, setFolderName] = useState('untitled Folder');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChangeFolderName = (event) => {
    setFolderName(event.target.value);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    if (folderName) {
      setIsModalVisible(false);
      const token = JSON.parse(window.localStorage.getItem('user')).token;
      // const currentUser = JSON.parse(window.localStorage.getItem('user')).user;
      const res = await addFolder(token, {
        addedBy: currentUser.email,
        folderName: folderName,
        // files: [{
        //     name: name,
        //     fileType: type,
        //     content: img.toString("base64")
        // }]

      });
      console.log(res);
      toast.success(`${folderName} created`);
      history.push({ pathname :'/newFile',
      state : {folderId : res.data}});
    }
    else {
      toast.error("Please enter folder name");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let history = useHistory();
  const handleNewFile = (event) => {
    // setNewFile(event.target.value);
    history.push('/newFile')
  }
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<SnippetsOutlined />} title="Add">
              <Menu.Item key="1">
                <Button type="primary" onClick={showModal}>
                  New Folder
                </Button>
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className='form-group' style={{ display: "flex", justifyContent: "left" }}>
                    <label htmlFor="Folder Name">Folder name</label>
                    <input
                      type='text'
                      className='form-control'
                      name='FolderName'
                      value={folderName}
                      onChange={onChangeFolderName}
                    />
                  </div>
                </Modal>
              </Menu.Item>
              <Menu.Item key="2">
                <Button type="primary" onClick={handleNewFile}>
                  New File
                </Button>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="My Account">
              <Menu.Item key="5">Profile</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Notifications">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Content */}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserComponent;