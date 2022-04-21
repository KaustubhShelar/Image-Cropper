import React,{useState} from 'react'
import '../App.css'
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";

import useSmallScreen from './smallScreen';

const Cropper = ({shape,selectedImage,setSelectedImage,setOpen,open,fileN,style}) => {

  const smallScreen = useSmallScreen();
  const[scaleValue , setScaleValue]=useState(1);
  const[rotate , setRotate]=useState(0);

  if(smallScreen){
    Cropper.height = shape==="square"?200:157;
    Cropper.width = shape==="square"?200:220;
    Cropper.border= shape==="square"?150:0;
  }else{
    Cropper.height = shape==="square"?300:250;
    Cropper.width = shape==="square"?300:350;
    Cropper.border= shape==="square"?150:0;

  }
  

  var editor = null;

  // const [selectedImage, setSelectedImage] = useState({
  //   openCropper: false,
  //   selectedImage: null,
  //   fileUploadErrors: []
  // });

  const setEditorRef = (ed) => {
    editor = ed;
  };
  
  const scaleIn = () => {
    if(scaleValue < 4.97){ 
      setScaleValue(
      scaleValue + 0.2
    ) }
  };

  const scaleOut = (e) => {
    if(scaleValue > 1){ 
      setScaleValue(
      scaleValue - 0.2
    ) }

  };

  const rotateLeft = (e) => {
    setRotate(
      (rotate - 45) % 360 ,
  )
  }

  const rotateRight = (e) => {
    setRotate(
      (rotate + 45) % 360 ,
    )
  }

  const DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const extractImageFileExtensionFromBase64 = (base64Data) => {
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
}

    const handleUpload=(e)=>{
    const url = editor.getImageScaledToCanvas().toDataURL();
    const fileExt = extractImageFileExtensionFromBase64(url);
    if(!Cropper.finalFileName){
      Cropper.finalFileName=fileN;
    }
    const fileName=Cropper.finalFileName + '.' + fileExt  ;
    const croppedFile = DataURLtoFile(url, fileName);
    console.log(croppedFile);
    let formdata = new FormData();
    formdata.append('file', croppedFile)
    axios({
      url: 'http://127.0.0.1:5000/upload',
      method: "POST",
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formdata
    }).then((res)=>{
      if (res.status === 200) {
        console.log(res)  
      } 
    })
    .catch(err => { if(err.request){ console.log(err.request)  } if(err.response){ console.log(err.response) } });
    window.location.reload(false);
    alert("File Successfully Uploaded")
}

  const profilePicChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { name } = file
    Cropper.finalFileName = name.split('.').slice(0, -1).join('.')
    const { type } = file;
    if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
    } else {
      setSelectedImage({ openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
    }
  };

  return (
    <Dialog 
    style={smallScreen?{ height: 700 ,width: 360}:{}}
    maxWidth = {'md'}
    fullWidth={true}
    open={open} onClose={()=>setOpen(false)}>
     <DialogTitle align="right">
          <IconButton onClick={()=>setOpen(false)}>
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <div className="App">
    <label class="custom-file-upload">
      <input type="file" name="profilePicBtn" accept="image/*" onChange={(e)=>profilePicChange(e)} />
      Select File
      </label>
       <br/><br/>
       <div>
       <button className="btn btn-outline-success fa fa-search-minus" onClick={()=>scaleOut(scaleValue)} value={scaleValue}></button>
       <button className="btn btn-outline-success fa fa-search-plus" onClick={()=>scaleIn(scaleValue)} value={scaleValue}></button>
       <button className="btn btn-outline-success fa fa-rotate-left" onClick={(e)=>rotateLeft(e)}></button>
       <button className="btn btn-outline-success fa fa-rotate-right" onClick={(e)=>rotateRight(e)}></button>
       </div>
       <br/>
       <div>
       <AvatarEditor
            image={selectedImage.selectedImage} border={30} scale={scaleValue}
            height={Cropper.height} width={Cropper.width} borderRadius={Cropper.border}
             rotate={rotate} ref={setEditorRef}
        />  
        </div>
        <button type='button' className="btn btn-outline-primary" onClick={(e)=>handleUpload(e)}>Upload</button>
        <br/>
        <br/>
         <link rel="stylesheet" href="https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css" crossOrigin="anonymous"></link>   
         
    </div>
	  </Dialog>
    
  )
  
}


export default Cropper
