import { Chart } from "../Chart/Chart";
import { EditSliceBox } from "../EditSliceBox/EditSliceBox";
import { CreateSliceBox } from "../CreateSliceBox/CreateSliceBox";
import Modal from "../Modal/Modal";
import "./App.css";
import { Slice } from "../Slice";

import { useEffect, useState } from "react";

function App() {
  // Slice interface

  const backgroundColors = [
    "#FFB3B3", // Light Coral
    "#AFCBFF", // Light Sky Blue
    "#FFE1A8", // Light Apricot
    "#B4F8C8", // Soft Mint
    "#D7B3FF", // Soft Lavender
    "#FFD580", // Light Orange
    "#C5E1A5", // Soft Green
    "#FFABAB", // Light Rose
    "#9EC1CF", // Soft Blue
    "#F7A072", // Soft Peach
  ];

  // A bunch of useStates for various things.

  // bool to set visible/invisible the edit/remove/set prompt
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // const datasetindex to keep track of the index of clicked arc.
  const [datasetIndex, setDatasetIndex] = useState(-1);

  const [totalHours, setTotalHours] = useState(24);
  const [sleep, setSleep] = useState(totalHours / 3);
  const [freetime, setFreeTime] = useState(totalHours - sleep);
  const [slicesList, setSlicesList] = useState<Slice[]>([
    {
      id: 0,
      hours: sleep,
      name: "Sleep",
      status: false,
      backgroundColor: backgroundColors[0 % 10],
    },
    {
      id: 1,
      hours: freetime,
      name: "Free Time",
      status: false,
      backgroundColor: backgroundColors[1 % 10],
    },
  ]);

  // use effect to update freetime whenever the slicesList undergoes any changes.
  useEffect(() => {
    setSleep(totalHours / 3);
    const newFreetime =
      totalHours -
      slicesList
        .filter((slice) => slice.id !== 1)
        .reduce((sum, slice) => sum + slice.hours, 0);
    if (newFreetime !== slicesList[1].hours) {
      setFreeTime(newFreetime);
      setSlicesList(
        slicesList.map((slice) => {
          if (slice.id === 1) {
            return { ...slice, hours: newFreetime };
          } else {
            return slice;
          }
        })
      );
    }
  }, [slicesList]);

  const addSlice = (name: string, hours: number) => {
    if (freetime - hours >= 0) {
      if (name === "" || hours <= 0 || hours > 24 || Number.isNaN(hours)) {
        alert("Please enter enter a valid hour amount and name!");
      } else {
        const id =
          slicesList.length === 0
            ? 1
            : slicesList[slicesList.length - 1].id + 1;
        const sliceToAdd = {
          name: name,
          hours: hours,
          id:
            slicesList.length === 0
              ? 1
              : slicesList[slicesList.length - 1].id + 1,
          status: false,
          backgroundColor: backgroundColors[id % 10],
        };
        setSlicesList([...slicesList, sliceToAdd]);
        toggleCreateModal();
      }
    } else {
      alert("adding: Total task hours cannot exceed limit");
    }
  };

  // function to edit a slice given its index and its new name/hours
  const editSlice = (
    sliceName: string,
    sliceHours: number,
    datasetIndex: number
  ) => {
    // if the slice name is non empty or the slice hours is valid, then we want to do some editing.
    // if they're both empty, we can't do anything.
    const clickedSlice = slicesList[datasetIndex];
    const sliceId = clickedSlice.id;
    console.log(sliceId);
    if (freetime - sliceHours <= totalHours) {
      setSlicesList(
        slicesList.map((slice) => {
          if (sliceId == datasetIndex) {
            return {
              // if the name or hours is set to blank or hours out of range, then they should be unchanged.
              ...slice,
              name: sliceName.trim() === "" ? slice.name : sliceName,
              hours:
                sliceHours <= 0 || sliceHours > 24 || Number.isNaN(sliceHours)
                  ? slice.hours
                  : sliceHours,
            };
          } else {
            return slice;
          }
        })
      );
      toggleEditModal();
    } else {
      alert("editing: Total task hours cannot exceed limit");
    }
  };

  // Function deletes an Arc of the doughnut chart, given an id number.
  const deleteArc = (datasetIndex: number) => {
    if (datasetIndex !== 1) {
      const clickedSlice = slicesList[datasetIndex];
      const sliceId = clickedSlice.id;
      setSlicesList(slicesList.filter((slice) => slice.id !== sliceId));
    }
    if (datasetIndex === 0) {
      setSlicesList(
        slicesList.map((slice) =>
          slice.id === 0 ? { ...slice, hours: 0 } : slice
        )
      );
    }
  };

  // function to toggle modal to the opposite of what it currently is.
  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  // function for the create modal toggle, similar to other modal but this is for the create new slice rather than edit new slice
  const toggleCreateModal = () => {
    setCreateModalVisible(!createModalVisible);
  };

  // function sets the edit/remove/set as done prompt visible.
  const handleArcClick = (datasetIndex: number) => {
    // if the user clicked the free time, don't do anything.
    if (datasetIndex === 1) {
      alert("Cannot edit free time.");
    } else if (slicesList[datasetIndex].status === true) {
      // if the slice is currently marked true, then a click should simply mark it false and set the slice to its regular background color.
      setSlicesList(
        slicesList.map((slice) => {
          // Note to self: there's identical code in markCompleted(), not sure why. fix it.
          if (slice.id == datasetIndex) {
            return {
              ...slice,
              status: !slice.status,
              backgroundColor: slice.backgroundColor,
            };
          } else {
            return slice;
          }
        })
      );
    } else {
      // otherwise, set the dataset index of the arc that was clicked and remove the edit modal.
      setDatasetIndex(datasetIndex);
      toggleEditModal();
    }
  };

  // function to mark a slice as completed, taking in a datasetindex of slice to be set as completed.
  const markCompleted = (datasetIndex: number) => {
    setSlicesList(
      slicesList.map((slice) => {
        if (slice.id == datasetIndex) {
          return {
            // if the name or hours is set to blank or hours out of range, then they should be unchanged.
            ...slice,
            status: !slice.status,
            backgroundColor: slice.backgroundColor,
          };
        } else {
          return slice;
        }
      })
    );
    toggleEditModal();
  };

  // function to change the total hours from day to week
  // should implement this later.
  // const changeDayWeek = () => {
  //   if (totalHours === 24) {
  //     setTotalHours(168);
  //   }
  //   if (totalHours === 168) {
  //     setTotalHours(24);
  //   }
  // };

  return (
    <>
    {/* button to change the totalhours from day to week, will implement at some point. */}
      {/* <button onClick={() => changeDayWeek()}>Change From Day to Week</button> */}
      <button onClick={() => toggleCreateModal()}>Add Slice</button>
      {createModalVisible && (
        <Modal
          toggleModal={toggleCreateModal}
          modalBox={
            <CreateSliceBox
              addSlice={addSlice}
              toggleModal={toggleCreateModal}
            />
          }
        ></Modal>
      )}

      <Chart slicesList={slicesList} handleArcClick={handleArcClick} />
      {editModalVisible && (
        <Modal
          toggleModal={toggleEditModal}
          modalBox={
            // Could we have one Box component for both edit and create?
            // hmmm...
            <EditSliceBox
              editSlice={editSlice}
              toggleModal={toggleEditModal}
              datasetIndex={datasetIndex}
              deleteArc={deleteArc}
              markCompleted={markCompleted}
            />
          }
        ></Modal>
      )}
    </>
  );
}
export default App;
