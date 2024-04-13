import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input, Table, message } from "antd";


const Edit = ({isEditModalOpen, setIsEditModalOpen,categories, setCategories}) => {

  const [edittingRow, setEdittingRow] = useState({});
 

  const onFinish = (values) =>{
    try{
      fetch(process.env.REACT_APP_SERVER_URL + "api/categories/update-category",
      {method:"PUT",
      body: JSON.stringify({...values,categoryId:edittingRow._id}),
      headers:{"Content-type":"application/json; charset=UTF-8"}
      }
      )
      message.success("Kategori başarıyla güncellendi")
      setCategories(
        categories.map( (item) =>{
          if(item._id === edittingRow._id){
            return{...item, title: values.title}
          }
          return item
        })
      )
    }catch(error){
      message.success("Kategori güncellenemedi")
      console.log(error)
    }
  }

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL + "api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };
  
  const columns = [
    {
      title: 'Category Title',
      dataIndex: 'title',
      render: (_,record) =>{
        if(record._id === edittingRow._id){
          return(
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title}/>
            </Form.Item>
          )
        }else{
          return(
            <p>{record.title}</p>
          )
        }
        
      }
    },
    {
      title:"Action",
      dataIndex:"action",
      render:(text,record)=>{
        return (
          <div>         
             <Button type="link" onClick={() => setEdittingRow(record)} className="pl-0">Düzenle</Button>
             <Button type="link" htmlType="submit" className="text-gray-500">Kaydet</Button>
             <Button type="link" danger onClick={()=> deleteCategory(record._id)}>Sil</Button>
          </div>
        )
      }
    }
  ];
  


  return (
    
      <Modal
          title="Kategori Güncele/Sil"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={false}>
          <Form onFinish={onFinish}>
            <Table bordered dataSource={categories} columns={columns} rowKey={"_id"}/>
          </Form>
        </Modal>
  );
};

export default Edit;
