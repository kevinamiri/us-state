import React from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { IonPopover } from "@ionic/react";
import { SelectChangeEventDetail } from "@ionic/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSelected, updateIsOpenStatus } from "../slices/fieldsValue";
import { incrementByAmount } from "../slices/counter";

export const SingleSelection = () => {
  const dispatch = useDispatch();
  const { vaultValue } = useSelector((state: any) => state.fieldsValue);
  const { answer } = useSelector((state: any) => state.fieldsValue);
  const { isOpen } = useSelector((state: any) => state.fieldsValue);
  const [selection, setSelection] = React.useState(vaultValue[0]);
  const handleSelectChange = (e: CustomEvent<SelectChangeEventDetail<any>>) => {
    e.detail.value !== answer.name && dispatch(incrementByAmount(-50));
    e.detail.value === answer.name && dispatch(addSelected(e.detail.value));
    e.detail.value === answer.name && dispatch(incrementByAmount(+50));
    setSelection(e.detail.value);
    dispatch(updateIsOpenStatus(false));
  };
  console.log("%c SingleSelection", "background: #222; color: #bada55");
  return (
    <IonPopover
      cssClass='my-custom-class'
      isOpen={isOpen}
      onDidDismiss={() => {
        dispatch(updateIsOpenStatus(false));
      }}
    >
      <IonList>
        <IonItem>
          <IonSelect
            value={selection}
            okText='Okay'
            cancelText='Dismiss'
            onIonChange={handleSelectChange}
          >
            {vaultValue.map((item) => (
              <IonSelectOption key={item} value={item}>
                {item}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
    </IonPopover>
  );
};
