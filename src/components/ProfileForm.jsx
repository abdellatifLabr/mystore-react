import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck } from '@fortawesome/free-solid-svg-icons';

import ImageFilePreview from '../components/ImageFilePreview';
import userProvider from '../providers/user.provider';

class ProfileForm extends Component {
  state = {
    loading: false,
    errors: {},
    success: false,
    profile: null,
    profileFormData: {
      bio: '',
      phone: '',
      avatar: ''
    }
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let field = e.target.name;
    let type = e.target.type;
    let value;

    switch (type) {
      case 'text':
        value = e.target.value;
        break;
      
      case 'textarea':
        value = e.target.value;
        break;

      case 'checkbox':
        value = !!(e.target.checked);
        break;
      
      case 'file':
        value = e.target.files && e.target.files[0];
        break;
      
      case 'number':
        value = parseFloat(e.target.value);
        break;
    
      default:
        break;
    }

    this.setState({
      profileFormData: {
        ...this.state.profileFormData,
        [field]: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true, errors: {}, success: false });

    let fields = this.state.profileFormData;

    userProvider.updateProfile(fields)
      .then(data => {
        this.setState({ loading: false });

        let { success, errors } = data;

        if (success) this.setState({ success: true });

        if (errors) this.setState({ errors });
      });
  } 

  componentDidMount() {
    userProvider.myProfile()
      .then(profile => {
        if (profile) {
          this.setState({ profile });

          let { avatar, ...profileData } = profile;

          let _profile = {};
          for (let prop in this.state.profileFormData) {
            _profile[prop] = profileData[prop];
          }

          this.setState({
            profileFormData: {
              ..._profile
            }
          });
        }
      });
  }

  getErrorFeedbackDOM(fieldName) {
    if (this.state.errors[fieldName]) {
      return (      
        <ul className="text-danger">
          { 
            this.state.errors[fieldName].map(error => (
              <li key={error.code}>{ error.message }</li>
            ))
          }
        </ul>  
      )
    }
    return;
  }

  render() {
    if (!this.state.profile) {
      return null;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <ImageFilePreview 
            label="Avatar"
            file={this.state.profile.avatar.original} 
            crop={{
              unit: 'px',
              width: this.state.profile.avatar.width,
              height: this.state.profile.avatar.height
            }}
            name="avatar"
            onChange={this.handleChange}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('avatar') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control 
            as="textarea"
            name="bio"
            required
            value={this.state.profileFormData.bio}
            onChange={this.handleChange}
            isInvalid={this.state.errors['bio']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('bio') }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text"
            name="phone"
            required
            value={this.state.profileFormData.phone}
            onChange={this.handleChange}
            isInvalid={this.state.errors['phone']}
          />
          <Form.Control.Feedback type="invalid">
            { this.getErrorFeedbackDOM('phone') }
          </Form.Control.Feedback>
        </Form.Group>
        { this.getErrorFeedbackDOM('nonFieldErrors') }
        <Button variant="primary" type="submit" disabled={this.state.loading}>
          { 
            this.state.loading 
            ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> 
            : 'Save Changes'
          }
        </Button>
        {
          this.state.success &&
          <Alert variant="success" className="m-0 mt-3">
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Profile updated successfully
          </Alert>
        }
      </Form>
    );
  }
}

export default ProfileForm;