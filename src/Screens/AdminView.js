import React, { useEffect, useState } from 'react';
import { Supabase } from "../config/supabase-config";
import { Link } from 'react-router-dom';

const AdminView = () => {
  const [trackingInfo, setTrackingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPriceId, setEditPriceId] = useState(null); // ID of the currently edited item
  const [newPrice, setNewPrice] = useState(""); // New price value

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const { data, error } = await Supabase
          .from("cargo")
          .select("*");
        
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        setTrackingInfo(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTrackingInfo();
  }, []);

  const handleEdit = (id, currentPrice) => {
    setEditPriceId(id);
    setNewPrice(currentPrice);
  };

  const handleSave = async (id) => {
    try {
      // Find the current item
      const currentItem = trackingInfo.find(info => info.id === id);
  
      // Update the price in the metadata while keeping other fields intact
      const updatedMetadata = {
        ...currentItem.metadata,
        price: newPrice,
      };
  
      // Update in Supabase
      const { error } = await Supabase
        .from("cargo")
        .update({ metadata: updatedMetadata })
        .eq("id", id);
  
      if (error) {
        console.error(error);
        return;
      }
  
      // Update local state
      setTrackingInfo(trackingInfo.map(info =>
        info.id === id ? { ...info, metadata: updatedMetadata } : info
      ));
  
      setEditPriceId(null);
      setNewPrice("");
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (id) => {
    try {
      const { error } = await Supabase
        .from("cargo")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      setTrackingInfo(trackingInfo.filter(info => info.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="view">

        <div className="gen">
            <h3>General Information</h3>
            <Link to='/adminform'><button>Add</button></Link>
        </div>  

        {trackingInfo.map((info) => (
          <div className="card1" key={info.id}>
            <div className="cc">
              <h5>Tracking Number: <span>{info.metadata.trackNumber}</span></h5>
              {editPriceId === info.id ? (
                <div>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                  <button onClick={() => handleSave(info.id)}>Save</button>
                </div>
              ) : null}
                <h5>Invoice: <span>{info.metadata.price}</span></h5>

              <h5>Receiver's Name: <span>{info.metadata.receiversName}</span></h5>
              <h5>Receiver's Phone: <span>{info.metadata.receiversPhone}</span></h5>
              <h5>Receiver's Email: <span>{info.metadata.receiversEmail}</span></h5>
              <h5>Receiver's Address: <span>{info.metadata.receiversAddress}</span></h5>
              <h5>Sender's Name: <span>{info.metadata.sendersName}</span></h5>
              <h5>Sender's Phone: <span>{info.metadata.sendersPhone}</span></h5>
              <h5>Sender's Email: <span>{info.metadata.sendersEmail}</span></h5>
              <h5>Sender's Address: <span>{info.metadata.sendersAddress}</span></h5>
              <h5>Item: <span>{info.metadata.item}</span></h5>
              <h5>Destination: <span>{info.metadata.destination}</span></h5>
              <h5>Date Sent: <span>{info.metadata.dateSent}</span></h5>
              <h5>Delivery Date: <span>{info.metadata.deliverydate}6</span></h5>
              <h5>First Destination: <span>{info.metadata.firstdestination}</span></h5>
              <h5>Second Destination: <span>{info.metadata.seconddestination}</span></h5>
              <h5>Third Destination: <span>{info.metadata.thirddestination}</span></h5>
              <h5>Status: <span>{info.metadata.status}</span></h5>
              <div className="btn">
                <button onClick={() => handleEdit(info.id, info.metadata.price)}>Edit Price</button>
                <button onClick={() => handleDelete(info.id)}>Delete</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminView;
