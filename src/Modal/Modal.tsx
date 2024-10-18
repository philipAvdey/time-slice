import "./Modal.css";

interface Props {
  toggleModal: Function;
  modalBox: React.ReactNode;
}
const Modal = (props: Props) => {
  return (
    <>
      <div className="modal">
        <div
          className="modal__overlay"
          onClick={() => props.toggleModal()}
        ></div>
        <div className="modal__box">
            {
              props.modalBox
            }
          {/* need to implement a similar function to the addSlice function where it auto updates useState hours and name vars when user types stuff in. overall, should model this off the CreateSlice component. Or maybe reuse it entirely?? Hmm. */}
          <button onClick={() => props.toggleModal()}>Close Modal</button> 
        </div>
      </div>
    </>
  );
};

export default Modal;
