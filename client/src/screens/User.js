// import UserComponent from '../components/UserComponent'
// const User=() =>{
//   return(
//     <UserComponent/>
//   )
// }

// export default User ;
import { Layout, Menu, Button } from 'antd';
import { SnippetsOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import NewFolder from '../components/NewFolder';
import '../User.css';
import '../App.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const UserComponent = () => {

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
               < NewFolder />
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