import React, { useEffect, useState } from 'react';
import map from '../Images/map.webp'
import logo from '../Images/logoo.jpeg'
import { Supabase } from "../config/supabase-config";

const TrackInfo = () => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      const fetchUserInfo = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found");
          return;
        }
  
        try {
          const { data, error } = await Supabase
            .from("cargo")
            .select("*")
            .eq("id", userId)
            .single();
  
          if (error) {
            console.error("Error fetching user info:", error);
            return;
          }
  
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
  
      fetchUserInfo();
    }, []);
  
    if (!userInfo) {
      return <div>Loading...</div>;
    }


    return (
        <div className='trk'>
          <div className='tracking'>
            <div className="logo">
              <a href="https://cargo-merit.netlify.app/home.html"><img src={logo} alt="" /></a>
            </div>
            <h4>Home | Tracking</h4>
          </div>
          

            <div class="details">
                <h1>TRACKING DETAILS</h1>
                <div class="welcome">
                    <h2>Tracking Number</h2>
                    <p>{userInfo.metadata?.trackNumber}</p> 
                </div>
                <div class="welcome">
                    <h2>Invoice</h2>
                    <p>{userInfo.metadata?.price}</p> 
                </div>
                <div class="track">
                    <div class="th">
                        <h2>RECEIVER'S DETAILS</h2>
                    </div>
                    <div class="td">
                        <div class="welcome">
                            <h3>Name:</h3>
                            <p>{userInfo.metadata?.receiversName}</p>
                        </div>
                        <div class="welcome">
                            <h3>Tel:</h3>
                            <p>{userInfo.metadata?.receiversPhone}</p>
                        </div>
                        <div class="welcome">
                            <h3>E-mail:</h3>
                            <p>{userInfo.metadata?.receiversEmail}</p>
                        </div>
                        <div class="welcome">
                            <h3>Address:</h3>
                            <p>{userInfo.metadata?.receiversAddress}</p>
                        </div>
                        
                    </div>
                </div>
            
                <div class="track">
                    <div class="th">
                        <h2>SENDER'S DETAILS</h2>
                    </div>
                    <div class="td">
                        <div class="welcome">
                            <h3>Name:</h3>
                            <p>{userInfo.metadata?.sendersName}</p>
                        </div>
                        <div class="welcome">
                            <h3>Tel:</h3>
                            <p>{userInfo.metadata?.sendersPhone}</p>
                        </div>
                        <div class="welcome">
                            <h3>E-mail:</h3>
                            <p>{userInfo.metadata?.sendersEmail}</p>
                        </div>
                        <div class="welcome">
                            <h3>Address:</h3>
                            <p>{userInfo.metadata?.sendersAddress}</p>
                        </div>
                        
                    </div>
                </div>


                <div class="track">
                    <div class="th">
                        <h2>ITEM(S) DESCRIPTION</h2>
                    </div>
                    <div class="td">
                        <div class="welcome">
                            <h3>Item:</h3>
                            <p>{userInfo.metadata?.item}</p>
                        </div>
                        <div class="welcome">
                            <h3>Number of Items</h3>
                            <p>{userInfo.metadata?.noOfItem}</p>
                        </div>
                        
                        
                    </div>
                </div>


                <div class="track">
                    <div class="th">
                        <h2>PARCEL TRANSIT</h2>
                    </div>
                    <div class="td">
                        <div class="welcome">
                            <h3>Destination:</h3>
                            <p>{userInfo.metadata?.destination}</p>
                        </div>
                        <div class="welcome">
                            <h3>Date sent:</h3>
                            <p>{userInfo.metadata?.dateSent}</p>
                        </div>
                        <div class="welcome">
                            <h3>Estimated delivery Date:</h3>
                            <p>{userInfo.metadata?.deliverydate}</p>
                        </div>
                        
                        
                    </div>
                </div>


                <div class="track">
                    <div class="th">
                        <h2>PARCEL MOVEMENT</h2>
                    </div>
                    <div class="td1">
                        <div class="welcome">
                            <h3>{userInfo.metadata?.firstdestination}</h3>
                            <h3>{userInfo.metadata?.seconddestination}</h3>
                            <h3>{userInfo.metadata?.thirddestination}</h3>
                        </div>
                        
                        
                    </div>
                </div>

                <div class="track">
                    <div class="th">
                        <h2>STATUS</h2>
                    </div>
                    <div class="td1">
                        <div class="welcome">
                            <h3>{userInfo.metadata?.status}</h3>
                        </div>
                        
                        
                    </div>
                </div>




            </div>
        </div>
      )
}

export default TrackInfo