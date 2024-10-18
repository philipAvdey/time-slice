import "./Chart.css";
import { useEffect, useState } from "react";
import { Slice } from '../Slice';

import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartData,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(Colors, ArcElement, Tooltip, Legend, PieController);

// .map(a => a.name)} data={slicesList.map(a => a.hours)


interface Props {
  slicesList: Slice[];
  handleArcClick: Function;
  // Should have a remove slice function and a mark as cleared function and an edit slice function and all that as props, which it calls when a slice is removed.
  // clear task, edit task, remove task all need task id...
  // so current props list won't work. we need the slices, since each slice struct has the id.
  // todo: pass in the slices list as the main prop, then parse out two arrays of labels and data out of there and put it into the chart. then somehow match up id when a chart slice is clicked to remove/edit/clear or whatever.
}

export const Chart = (props: Props) => {
  const data = {
    labels: props.slicesList.map((a) => a.name),
    datasets: [
      {
        data: props.slicesList.map((a) => a.hours),
        backgroundColor: props.slicesList.map((a) => {
          return a.status == true ? "#D3D3D3" : a.backgroundColor; 
        }
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    animations: {
      backgroundColor: {
        duration: 0, // Disables color transition specifically
      },
    },
    onClick: function (event: any, elements: any[]) {
      const datasetIndex = elements[0].index;
      props.handleArcClick(datasetIndex);
    },
  };

  return (
    <>
      <div className={`chart`}>
        <Doughnut data={data} options={options}></Doughnut>
      </div>
    </>
  );
};
