// src/services/firebaseService.js
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  doc, 
  updateDoc,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

// Contacts/Conversations
export const subscribeToContacts = (userId, callback) => {
  const q = query(
    collection(db, 'conversations'),
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTimestamp', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(contacts);
  });
};

// Messages
export const subscribeToMessages = (conversationId, callback) => {
  const q = query(
    collection(db, 'conversations', conversationId, 'messages'),
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};

// Send Message
export const sendMessage = async (conversationId, messageData) => {
  try {
    const messageRef = await addDoc(
      collection(db, 'conversations', conversationId, 'messages'),
      {
        ...messageData,
        timestamp: serverTimestamp()
      }
    );
    
    // Update conversation's last message
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: messageData.text || 'File shared',
      lastMessageTimestamp: serverTimestamp()
    });
    
    return messageRef;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Upload File
export const uploadFile = async (file, conversationId) => {
  try {
    const fileRef = ref(storage, `conversations/${conversationId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      fileName: file.name,
      fileUrl: downloadURL,
      fileSize: file.size,
      fileType: file.type
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Upload Audio
export const uploadAudio = async (audioBlob, conversationId) => {
  try {
    const audioRef = ref(storage, `conversations/${conversationId}/audio_${Date.now()}.ogg`);
    const snapshot = await uploadBytes(audioRef, audioBlob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

// Search Messages
export const searchMessages = async (conversationId, searchTerm) => {
  try {
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return messages.filter(msg => 
      msg.text?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching messages:', error);
    throw error;
  }
};