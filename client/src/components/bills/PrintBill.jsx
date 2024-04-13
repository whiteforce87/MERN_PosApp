import { Modal, Button } from "antd";
import React from "react";
import { useRef } from "react";
import {useReactToPrint} from "react-to-print"

function PrintBill({ isModalOpen, setIsModalOpen, customer }) {

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current
})

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">Fatih's PosApp</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 selection:grid-cols-4 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı:</p>
                  <p className="text-green-600">{customer.customerName}</p>
                  <p>Street 123</p>
                  <p>Oak village</p>
                  <p>Ca 12223</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura</p>
                  Company
                  <p>Street 123</p>
                  <p>Oak village</p>
                  <p>Ca 12223</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Fatura Numarası</p>
                    <p>00{Math.floor(Math.random()*1000)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Veriliş tarihi</p>
                    <p>{(customer?.createdAt)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Terms</p>
                    Unwrapped
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Due</p>
                    2023-01
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                    {" "}
                      Başlık
                    </th>
                    <th
                    colSpan="4"
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                    >
                    {" "}
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-end text-sm font-normal text-slate-700  md:pl-0 " 
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(customer?.cartItems) && customer.cartItems.map((item)=>(
                    <tr className="border-b border-slate-200" key={item._id}>
                    <td className="py-4 sm:table-cell hidden">
                      <img
                        src={item.img}
                        alt=""
                        className="w-12 h-12 object-cover"
                      ></img>
                    </td>
                    <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="sm:hidden inline-block text-xs">Birim Fiyatı {item.price}₺</span>
                        </div>
                    </td>
                    <td className="py-4 sm:hidden">
                        <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="sm:hidden inline-block text-xs">Birim Fiyatı {item.price}₺</span>
                        </div>
                    </td>
                    <td className="py-4 sm:text-center sm:table-cell hidden">
                      <span>{item.price}₺</span>
                    </td>
                    <td className="py-4 text-center sm:table-cell hidden">
                      <span>{item.quantity}</span>
                    </td>
                    <td className="py-4  text-right" colSpan="4">
                      <span>{(item.price * item.quantity).toFixed(2)}₺</span>
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-left pt-6 sm:hidden" scope="row" colSpan="4">
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-right pt-6" scope="row" colSpan="4">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}₺
                      </span>
                    </th>
                    </tr>
                    <tr>
                    <th className="text-right pt-4 sm:table-cell hidden" scope="row" colSpan="4">
                      <span className="font-normal text-slate-700">
                        Kdv
                      </span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Kdv
                      </span>
                    </th>
                    
                    <th className="text-right pt-3" scope="row">
                      <span className="font-normal text-red-700">
                        {customer?.tax}₺
                      </span>
                    </th>
                    </tr>
                    <tr>
                    <th className="text-end pt-4 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Toplam
                      </span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Toplam
                      </span>
                    </th>
                    <th className="text-right pt-3" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9">
                <p className="text-sm font-light text-slate-700">
                    "Ödemenizi kredi kartı ya da iban ile yapabilirsiniz. 
                    14 gün içinde ödenmezse iade gerçekleşmediği taktirde yasal olarak %8 ceszası bulunmaktadır."
                </p>
              </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
      <Button type="primary" size="large" onClick={handlePrint}>Yazdır</Button>
      </div>
    </Modal>
  );
}

export default PrintBill;
