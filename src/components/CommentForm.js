import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';




const CommentForm = (props) => {
  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const handleSubmit = (values) => {
  
   props.postComment(props.dishId, values.rating, values.author, values.comment);
   alert('Current State is: ' + JSON.stringify(values));
    
}

  return (
    <div>
      <Button outline onClick={toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
        <ModalBody>
            <div className="col-12 col-md-9">
                <LocalForm onSubmit={(values) => handleSubmit(values)}>
                <Row className="form-group">
                            <Label>Rating</Label>
                            <Control.select model=".rating" name="rating" id="rating"
                                    className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="yourname">Your name</Label>
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder="Your Name" className="form-control" validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger" model=".yourname" show="touched" messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than two characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="message">Comment</Label>
                        
                            <Control.textarea model=".message" id="message" name="message"
                                rows="12" className="form-control"
                                ></Control.textarea>
                        
                    </Row>
                    <Row className="form-group">
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary" >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </div>
        </ModalBody>

      </Modal>
    </div>
  );
}

export default CommentForm;