import React,{useState} from 'react'
import { Supabase } from "../config/supabase-config";
import { useNavigate } from 'react-router-dom';


const AdminForm = () => {

    const navigate = useNavigate();

    const initialValues = {
        trackNumber:'',
        price:'',
        receiversName:'',
        receiversPhone:'',
        receiversEmail:'',
        receiversAddress:'',
        sendersName:'',
        sendersPhone:'',
        sendersEmail:'',
        sendersAddress:'',
        item:'',
        noOfItem:'',
        destination:'',
        firstdestination:'',
        seconddestination:'',
        thirddestination:'',
        dateSent:'',
        deliverydate:'',
        status:'',
    }


    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData));
    };

    const validate = (values) => {
        
        Supabase.from("cargo")
        .upsert([
          {
            trackNumber: formData.trackNumber,
            metadata: formData,
          },
        ])
        .then((response) => {
          console.log(response);
          alert('Successful')
        //   window.location.reload()
          navigate("/");
        })
        .catch((error) => {
          console.error('Error submitting form:', error.message);
        });
      };


  return (
    <div>
        <div className="admin-f">
            <h3>Upload Tracking Data</h3>
            <div className="admin-c">
                <input type="text" placeholder='Tracking no.' 
                value={formData.trackNumber}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      trackNumber: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder='Price e.g $100'
                value={formData.price}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder='Receiver name' 
                value={formData.receiversName}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      receiversName: e.target.value,
                    });
                  }}/>
                <input type="tel" placeholder='Receiver phone no.'
                value={formData.receiversPhone}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      receiversPhone: e.target.value,
                    });
                  }}/>
                <input type="email" placeholder="Receiver's email"
                value={formData.receiversEmail}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      receiversEmail: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="Receiver's Address" 
                value={formData.receiversAddress}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      receiversAddress: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="Sender's Name" 
                value={formData.sendersName}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      sendersName: e.target.value,
                    });
                  }}/>
                <input type="tel"  placeholder="Sender's phone number" 
                value={formData.sendersPhone}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      sendersPhone: e.target.value,
                    });
                  }}/>
                <input type="email"  placeholder="Sender's email" 
                value={formData.sendersEmail}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      sendersEmail: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="Sender's Address"
                value={formData.sendersAddress}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      sendersAddress: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="Item" 
                value={formData.item}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      item: e.target.value,
                    });
                  }}/>
                <input type="number" placeholder="Number of item(s)"
                value={formData.noOfItem}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      noOfItem: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="Destination" 
                value={formData.destination}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      destination: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="parcel first destination" 
                value={formData.firstdestination}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      firstdestination: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="parcel second destination" 
                value={formData.seconddestination}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      seconddestination: e.target.value,
                    });
                  }}/>
                <input type="text" placeholder="parcel third destination" 
                value={formData.thirddestination}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      thirddestination: e.target.value,
                    });
                  }}/>
                <div className="date">
                    <p>Date Sent</p>
                    <input type="date"  placeholder="Date sent" 
                    value={formData.dateSent}
                    onChange={(e) => {
                        setFormData({
                          ...formData,
                          dateSent: e.target.value,
                        });
                      }}/>
                </div>
                
                <div className="date">
                    <p>Delivery Date</p>
                    <input type="date" name="deliverydate" placeholder="Estimated delivery date" 
                    value={formData.deliverydate}
                    onChange={(e) => {
                        setFormData({
                          ...formData,
                          deliverydate: e.target.value,
                        });
                      }}/>
                </div>
                
                <input type="text" placeholder="Status" 
                value={formData.status}
                onChange={(e) => {
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    });
                  }}/>
        
                <button onClick={handleSubmit}>Enter</button>
        
            </div>
        </div>
    </div>
  )
}

export default AdminForm