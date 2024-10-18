import { CreateSlice } from "../CreateSlice/CreateSlice";

interface Props {
  editSlice: Function;
  toggleModal: Function;
  datasetIndex: number;
  deleteArc: Function;
  markCompleted: Function;
}

export const EditSliceBox = (props: Props) => {
  return (
    <>
      <h1>Edit This Slice</h1>
      <CreateSlice
        toggleModal={props.toggleModal}
        sliceFunction={props.editSlice}
        datasetIndex={props.datasetIndex}
      />
      <button onClick={() => props.markCompleted(props.datasetIndex)}>
        Mark slice as completed.
      </button>
      <button
        onClick={() => {
          if (props.datasetIndex != 1) {
            props.deleteArc(props.datasetIndex);
            props.toggleModal();
          }
        }}
      >
        Delete this slice.
      </button>
    </>
  );
};
