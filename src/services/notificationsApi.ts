import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const listenToNotifications = (
  callback: (notifications: Notification[]) => void
) => {
  return onSnapshot(collection(db, 'notifications'), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[];
    callback(data);
  });
};

export const markAllNotificationsAsRead = async () => {
  const q = query(collection(db, 'notifications'), where('read', '==', false));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);

  snapshot.forEach((docRef) => {
    batch.update(docRef.ref, { read: true });
  });

  await batch.commit();
};
