import { useState, useEffect } from 'react';
import { Typography, Button, Modal, Form, Input, Space } from 'antd';
import './UserProfilePage.css'; 
import Home from '../Home'
import axios from 'axios'

const UserProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userData, setUserData] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [nic, setNice] = useState('')
  const [email, setEmail] = useState('')
  const [addressLine1, setAddressLine1] = useState("")
const [addressLine2, setAddressLine2] = useState("")
const [city, setCity] = useState("")
const [country, setCountry] = useState("")
const [password, setPassword] = useState("")

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    const data = storedData ? JSON.parse(storedData) : null;
    setUserData(data)
  }, []);

  const data = {
    fistName: firstName,
    lastName: lastName,
    contactNumber: contactNumber,
    nic: nic
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (id) => {
    // e.preventDefault();
 
    console.log("data", data)
    try{
      let res = await axios.put("http://localhost:8080/api/v1/auth/update/"+id,data)
      if (res) {
      alert("updated Successfully")
    //   window.location.href="/"
      }else {
        alert("some error occured")
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <>
    <Home />
    <div className="container">
      <div className="title">
        <Typography.Title level={2}>User Details</Typography.Title>
      </div>
      <div className="details">
        <div className="detail-row">
          <Typography.Text strong>First Name:</Typography.Text>
          <Typography.Text>{userData.firstName}</Typography.Text>
        </div>
        <div className="detail-row">
          <Typography.Text strong>Last Name:</Typography.Text>
          <Typography.Text>{userData.lastName}</Typography.Text>
        </div>
        <div className="detail-row">
          <Typography.Text strong>Telephone:</Typography.Text>
          <Typography.Text>{userData.contactNumber}</Typography.Text>
        </div>
        <div className="detail-row">
          <Typography.Text strong>Email:</Typography.Text>
          <Typography.Text>{userData.email}</Typography.Text>
        </div>
        <div className="detail-row address">
          <Typography.Text strong>Address:</Typography.Text>
          <Typography.Text>
            {userData.addressLine1}, {userData.addressLine2}, {userData.city}, {userData.country}.
          </Typography.Text>
        </div>
      </div>
      <div className="button-row">
        <Button type="primary" className="update-button" onClick={showModal}>
          Update
        </Button>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form onFinish={()=>handleFormSubmit(userData.id)}>
          <div className="form-content">
            <Typography.Title level={3} className="form-title">
              Update User Details
            </Typography.Title>
            <Form.Item
              label="First Name"
              name="firstName"
              initialValue={userData.firstName}
              rules={[{ required: true, message: 'Please enter your first name' }]}
              onChange={(e) => setFirstName(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              initialValue={userData.lastName}
              rules={[{ required: true, message: 'Please enter your last name' }]}
              onChange={(e) => setLastName(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Telephone"
              name="contactNumber"
              initialValue={userData.contactNumber}
              rules={[{ required: true, message: 'Please enter your telephone number' }]}
              onChange={(e) => setContactNumber(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nic"
              name="nic"
              initialValue={userData.nic}
              rules={[
                { required: true, message: 'Please enter your nic' }]}
                onChange={(e) => setNice(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address Line 1"
              name="address"
              initialValue={userData.addressLine1}
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item className="form-buttons">
              <Space>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default UserProfilePage;
