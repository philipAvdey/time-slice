import "./CreateSlice.css";
import { useState } from "react";

interface Props {
  sliceFunction: Function;
  toggleModal: Function;
  datasetIndex?: number; // optional dataset index, in case we have to use it for editing
}

export const CreateSlice = (props: Props) => {
  const [newSliceName, setNewSliceName] = useState("");
  const [newSliceHours, setNewSliceHours] = useState(0);

  // const handleSave = () => {
  //   props.sliceFunction(newSliceName, newSliceHours, props.datasetIndex);
    
  // };

  return (
    <div className="popup">
      {/* <p className="popup__add-slice-text">Add Slice</p> */}
      <input
        className="popup__slice-name"
        type="text"
        placeholder="Name"
        value={newSliceName}
        onChange={(event) => {
          setNewSliceName(event.target.value);
        }}
      ></input>
      {/* Will need to change this later for when I implement week long planning, probably with a prop that says if the chart is in week, day, or month view.  */}
      <input
        className="popup__slice-hours"
        type="number"
        placeholder="Hours"
        min="0"
        max="24"
        value={newSliceHours}
        onChange={(event) => {
          setNewSliceHours(parseInt(event.target.value.trim()));
        }}
      ></input>

      <button className="popup__save-task-btn" onClick={() => props.sliceFunction(newSliceName, newSliceHours, props.datasetIndex)}>
        Save
      </button>
    </div>
  );
};
