import React, { useState } from 'react'

export const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false)
    const [qrData,setQrData]=useState("https://www.kaashivinfotech.com/")
    const [qrSize,setQrSize]=useState("150")
  async  function generateQR(){
    //    setImg("Images/2.jpg")
     setLoading(true);
     try{
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
    setImg(url)
     }catch (error) 
     {
        console.error("Error generating QR code", error) 
     } finally{
       setLoading(false)
     }
    }
    function downloadQR(){
        // alert("Mouse Welcome"+name)
       fetch(img).then((response)=>response.blob()).then((blob)=>{
        const link=document.createElement("a")
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
       }).catch((error)=>{
        console.error("Error in downloading QR Code",error)
       })
    }
  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p> }
        {/* <p>Please wait...</p> */}
      {img && <img src={img} className='qr-code-image'/>}
        {/* <img src={img} className='qr-code-image'/> */}
        <div>
            <label htmlFor="dataInput" className='input-label'>Data for QR Code:</label>
            <input type="text" id='dataInput' value={qrData} placeholder='Enter the data for Qr code' onChange={(e)=>setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className='input-label'>Image size (e,g., 150)</label>
            <input type="text" id='sizeInput' value={qrSize} placeholder='Enter image size' onChange={(e)=>setQrSize(e.target.value)} />
            {/* <button className='generate-button' onClick={()=>alert("h1")}>Generate QR Code</button> */}
            <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQR} >Download QR Code</button>
        </div>
        <p className='footer'>Designed by <a href='https://www.kaashivinfotech.com/'>Thayumanavan</a></p>
        </div>
  )
}

{/* <button className='generate-button' onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={()=> downloadQR(" Thayumanavan ")}>Download QR Code</button> */}
{/* <img src='Images/1.jpg' className='qr-code-image' onMouseEnter={()=> downloadQR(" Thayumanavan ")}/> */}