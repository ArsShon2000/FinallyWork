import React from "react";
import styImgUpload from './ImageUpload.module.css'

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      console.log('handle uploading-', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className={styImgUpload.previewText}>Пожалуйста, выберите<br/>изображение для аватара</div>);
      }
  
      return (
        <div className={styImgUpload.previewComponent}>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <div className={styImgUpload.inputArea}>
                <input className={styImgUpload.fileInput }
              type="file" 
              title=""
              onChange={(e)=>this._handleImageChange(e)} />
            </div>            
          </form>
          <div className={styImgUpload.imgPreview}>
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

  export default ImageUpload
