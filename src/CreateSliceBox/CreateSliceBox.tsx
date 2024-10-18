
import { CreateSlice } from "../CreateSlice/CreateSlice";
interface Props {
  addSlice: Function;
  toggleModal: Function; 
}

export const CreateSliceBox = ( props: Props ) => {
  return (
    <>
      <h1>Create New Slice</h1>
      <CreateSlice
        sliceFunction={props.addSlice}
        toggleModal={props.toggleModal}
      />
      
    </>
  );
};
