import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { pin } from "ionicons/icons";
import USMap from "./USMap";
import { useSelector } from "react-redux";
import { ComposableMap } from "react-simple-maps";
import { SingleSelection } from "./Selection";
export const CardExamples: React.FC = () => {
  const { value } = useSelector((state: any) => state.counter);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>US MAP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>US MAP Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <ComposableMap projection='geoAlbersUsa'>
              <SingleSelection />
              <USMap />
            </ComposableMap>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot='start' />
            <IonLabel>
              If you select the right state, it will be green and you will get
              points, but if the selected state is not correct then you will
              lose points.
            </IonLabel>
            <IonButton fill='outline' slot='end'>
              {value}
            </IonButton>
          </IonItem>
          <IonCardContent>
            The states closest to the one you selected will show up in the
            select box.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CardExamples;
