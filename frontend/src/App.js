import React, {useState} from "react";
import Cropper from "./component/cropper";
import Post from "./component/post";

import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';

import useSmallScreen from "./component/smallScreen";

const App = () => {
  const smallScreen = useSmallScreen();
const [open, setOpen] = useState(false);
const [openPost, setOpenPost]= useState(false);
const [selectedImage, setSelectedImage] = useState({
  openCropper: false,
  selectedImage: null,
  fileUploadErrors: []
});

const handleClickOpen = () => {
	setOpen(true);
};

const handleClickOpenPost = () => {
  setOpenPost(true);
};

const profilePicChange = (fileChangeEvent) => {
  const file = fileChangeEvent.target.files[0];
  const { name } = file
  App.finalFileName = name.split('.').slice(0, -1).join('.')
  const { type } = file;

  if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
  } else {
    setSelectedImage({ openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
    setOpen(true);
  }
};

const profilePicChangePost = (fileChangeEvent) => {
  const file = fileChangeEvent.target.files[0];
  const { name } = file
  App.finalFileName = name.split('.').slice(0, -1).join('.')
  const { type } = file;

  if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
  } else {
    setSelectedImage({ openCropper: true, selectedImage: fileChangeEvent.target.files[0], fileUploadErrors: [] });
    setOpenPost(true);
  }
};
  return (
    <div className='App'>
      <br/> <br/> <br/>
        <div>
      <Popup trigger={<Button variant="outlined" 
        color="primary" >
        Profile
        </Button>}  
       position="right center">
        {/* <Button variant="outlined"
        color="secondary"  onClick={handleClickOpen}>
        Update
        </Button><br/> */}
        <label class="custom-file-upload2">
        <input type="file" name="profilePicBtn" accept="image/*" onChange={(e)=>profilePicChange(e)} />
        UPDATE
        </label><br/>
        <Button variant="outlined"
        color="secondary" >
        Remove
        </Button><br/>
      </Popup>
    </div>
    
        {open&&
        <Cropper
        shape="square"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setOpen={setOpen}
        open={open}
        fileN={App.finalFileName}
        />
      }
       {/* <Button variant="outlined"
        color="primary" onClick={handleClickOpenPost}>
        Post
        </Button> */}
        <br/>
        <label class="custom-file-upload">
        <input type="file" name="profilePicBtn" accept="image/*" onChange={(e)=>profilePicChangePost(e)} />
        Post
        </label>
        {openPost&&
        <Post
        shape="rect"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setOpenPost={setOpenPost}
        openPost={openPost}
        fileN={App.finalFileName}
        />
      }
    </div>
  );
}

export default App;