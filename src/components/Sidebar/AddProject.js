import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddProject = () => {
  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProject;
