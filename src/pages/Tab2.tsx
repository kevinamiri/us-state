import { IonContent, IonPage } from "@ionic/react";
import "./Tab2.css";
import CardExamples from "../components/CardExamples";
import ReactTooltip from "react-tooltip";
/* Using with IonActionSheet Component */
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { IonActionSheet, IonButton } from "@ionic/react";
import { IonItem, IonList, IonListHeader, useIonPopover } from "@ionic/react";
import { SingleSelection } from "../components/Selection";
import allStates from "../components/data/allstates.json";

const Tab2: React.FC = () => {
  const [content, setContent] = React.useState<string>("Test content");

  return (
    <>
      <CardExamples />
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default Tab2;
