import { Modal, Form ,Input, Select, Card, Button, message } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {reset} from "../../redux/cartSlice"
import { useNavigate } from 'react-router-dom';

function CreateBill({isModalOpen, setIsModalOpen}) {
    
    const cart = useSelector((state) => state.cart)
    const dispact = useDispatch();
    const navigate = useNavigate()


    const onFinish= async (values) =>{
        try{
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill",{
            method:"POST",
            body:JSON.stringify({
                ...values,
                cartItems:cart.cartItems,
                subTotal:cart.total,
                tax:(cart.total * cart.tax)/100,
                totalAmount:(cart.total + ((cart.total * cart.tax)/100)).toFixed(2)

            }),
            headers:{"Content-type":"application/json; charset=UTF-8"}
        })
        if((await res).status === 200){
            message.success("Fatura başarıyla oluşturuldu")
            dispact(reset())
            navigate("/bills")
        }else{
            message.danger("Bir hata oluştu")

        }
        }catch(error){

        }
    }


  return (
    
    <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label="Müşteri Adı" name="customerName" rules={[{ required: true, message: "Username is required" }]} >
                <Input placeholder='Bir müşteri adı yazınız'></Input>
            </Form.Item>
            <Form.Item label="Tel No" name="customerPhoneNumber">
                <Input placeholder='Bir Tel no yazınız' maxLength={11}></Input>
            </Form.Item>
            <Form.Item label="Ödeme Yöntemi" name="paymentMode" rules={[{ required: true, message: "PaymentType is required" }]}>
                <Select placeholder="Ödeme Yöntemi Seçiniz">
                    <Select.Option value="Nakit">Nakit</Select.Option>
                    <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                </Select>
            </Form.Item>
            <Card 
              //size="large"
              //title="Small size card"
              //extra={<a href="#">More</a>}
             // style={{
             //   width: 300,
             // }}
            >
             <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span> {(cart.total).toFixed(2) > 0 ? (cart.total).toFixed(2) : 0}₺</span>
              </div>
              <div className="flex justify-between my-2">
              <span>Kdv</span>
              <span className="text-red-600"> {((cart.total * cart.tax)/100) > 0 ? `+${((cart.total * cart.tax)/100).toFixed(2)}`
            : 0 }₺</span>
              </div>
              <div className="flex justify-between">
              <span>Toplam</span>
              <span>{(cart.total +(cart.total * cart.tax)/100 ) > 0 ? (cart.total +(cart.total * cart.tax)/100 ).toFixed(2)
            : 0 }₺</span>
              </div>
            </Card>
            <div className='flex justify-end'>
                <Button className="mt-4  bg-blue-600" type="primary" size="large" 
                onClick={() => setIsModalOpen(true)} htmlType='submit'
                disabled = {cart.cartItems.length === 0}>
                    Sipraiş Oluştur</Button>
            </div>

        </Form>
    </Modal>
    
  )
}

export default CreateBill