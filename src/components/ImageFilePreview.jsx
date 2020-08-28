import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCropAlt, faFileAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ImageFilePreview extends Component {
  state = {
    message: '',
    loading: false,
    content: null,
    crop: null,
    image: null
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleFileOpen = this.handleFileOpen.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      if (this.props.file instanceof File) {
        let reader = new FileReader();
        reader.onloadend = data => this.setState({ content: data.currentTarget.result });
        reader.readAsDataURL(this.props.file);
      } else {
        this.setState({ content: this.props.file });
      }
    }
  }

  componentDidMount() {
    this.hiddenFileInput = React.createRef(null);

    let { width, height } = this.props.crop;
    let aspect = width / height;
    this.setState({ crop: { ...this.props.crop, aspect } });
  }
 
  handleFileOpen(e) {
    this.setState({ loading: true, message: '' });

    if (e.target.files) {
      let reader = new FileReader();
      reader.onloadend = data => {
        this.setState({ 
          content: data.currentTarget.result,
          loading: false
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(crop) {
    this.setState({ crop });
  }

  handleCrop() {
    this.setState({ loading: true, message: '' });

    this.extractCroppedImage()
      .then(() => this.setState({ loading: false, message: 'Cropped Successfully!' }));
  }

  async extractCroppedImage() {
    let crop = this.state.crop;
    let image = this.state.image;
    let canvas = document.createElement('canvas');
    let scaleX = image.naturalWidth / image.width;
    let scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    let ctx = canvas.getContext('2d');
    
    ctx.drawImage(
      image, 
      crop.x * scaleX, 
      crop.y * scaleY, 
      crop.width * scaleX, 
      crop.height * scaleY, 
      0, 
      0, 
      crop.width, 
      crop.height
    );

    let file = await this.createFileObject(canvas, `image_${this.props.name}`);
    this.props.onChange({
      target: {
        type: 'file',
        name: this.props.name,
        files: [file]
      }
    });

    return;
  }

  createFileObject(canvas, filename) {
    return new Promise((res, rej) => {
      canvas.toBlob(blob => {
        blob.name = filename;
        res(new File([blob], filename));
      }, 'image/jpeg', 1);
    });
  }

  handleImageLoaded(image) {
    this.setState({ image });
  }

  render() {
    if (!this.state.crop) return null;

    let { file, crop, ...props } = this.props;

    return (
      <Card>
        <Card.Header className="p-2">{this.props.label}</Card.Header>
        <ReactCrop 
          {...props} 
          src={this.state.content || file} 
          crop={this.state.crop}
          onChange={this.handleChange}
          onImageLoaded={this.handleImageLoaded}
        />
        <Card.Footer className="d-flex align-items-center p-2">
          <div className="mr-2">
            <Button variant="secondary" onClick={e => this.hiddenFileInput.current.click()}>
              <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon> Open Image
            </Button>
            <Form.File 
              hidden
              ref={this.hiddenFileInput}
              name={this.props.name}
              onChange={this.handleFileOpen}
            />
          </div>
          <div className="mr-2">
            <Button variant="success" onClick={this.handleCrop}>
              <FontAwesomeIcon icon={faCropAlt}></FontAwesomeIcon> Crop
            </Button>
          </div>
          <div className="text-secondary">
            {
              this.state.loading ? (
                <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
              ) : (
                <small className="text-success">{this.state.message}</small>
              )
              }
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

export default ImageFilePreview;