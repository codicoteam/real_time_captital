import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Smile, Mic, Play, Pause, X, Menu, Loader2 } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
import Sidebar from "../../components/User_Sidebar";
import AdminService from "../../services/admin_Services/admin_service";

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'contact';
  timestamp: string;
  isTyping?: boolean;
  type?: 'text' | 'image' | 'file' | 'audio';
  fileName?: string;
  fileUrl?: string;
  audioBlob?: Blob;
}

interface Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  profilePicture?: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
  isOnline?: boolean;
  role?: string;
  permissions?: string[];
  settings?: {
    interestRate?: number;
    loanTerms?: string[];
    workflows?: Record<string, string>;
  };
  notifications?: Array<{
    message: string;
    type: string;
    read: boolean;
    _id: string;
    createdAt: string;
  }>;
  auditTrail?: Array<{
    action: string;
    entity: string;
    entityId: string;
    performedBy: string;
    _id: string;
    performedAt: string;
  }>;
}

const FALLBACK_AVATAR = 'https://ui-avatars.com/api/?background=random&name=';

const Interface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your chat!',
      sender: 'contact',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [adminDetails, setAdminDetails] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentContact = contacts.find(c => c.id === selectedContact);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setLoadingContacts(true);
      setError('');

      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          setError("No authentication token found. Please login again.");
          return;
        }

        const response = await AdminService.getAllAdmins(token);
        
        if (response && response.data) {
          const adminsData = Array.isArray(response.data) ? response.data : [response.data];
          
          const formattedAdmins = adminsData.map((admin: any) => ({
            id: admin._id || '',
            firstName: admin.firstName || 'Unknown',
            lastName: admin.lastName || 'User',
            email: admin.email || 'No email',
            contactNumber: admin.contactNumber || '',
            profilePicture: admin.profilePicture || '',
            role: admin.role || 'user',
            permissions: admin.permissions || [],
            settings: admin.settings || {},
            notifications: admin.notifications || [],
            auditTrail: admin.auditTrail || [],
            isOnline: true,
            lastMessage: 'Available to chat',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));

          setContacts(formattedAdmins);
          if (formattedAdmins.length > 0) {
            setSelectedContact(formattedAdmins[0].id);
            setAdminDetails({
              id: formattedAdmins[0].id,
              firstName: formattedAdmins[0].firstName || 'Unknown',
              lastName: formattedAdmins[0].lastName || 'User',
              email: formattedAdmins[0].email || 'No email'
            });
          }
        } else {
          setError("Invalid response format from server");
        }
      } catch (err: any) {
        console.error("Error fetching admin data:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch admins");
      } finally {
        setLoading(false);
        setLoadingContacts(false);
      }
    };

    fetchAdminData();
  }, []);

  const generateMessageId = () => Date.now().toString();

  const handleSendMessage = () => {
    if (message.trim() || selectedFiles.length > 0 || audioBlob) {
      const newMessages: Message[] = [];

      if (message.trim()) {
        newMessages.push({
          id: generateMessageId(),
          text: message,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        });
      }

      selectedFiles.forEach((file, index) => {
        const fileUrl = URL.createObjectURL(file);
        newMessages.push({
          id: generateMessageId() + index,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: file.type.startsWith('image/') ? 'image' : 'file',
          fileName: file.name,
          fileUrl: fileUrl,
          text: file.type.startsWith('image/') ? '' : `File: ${file.name}`,
        });
      });

      if (audioBlob) {
        newMessages.push({
          id: generateMessageId() + '_audio',
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'audio',
          audioBlob: audioBlob,
          text: 'Audio message',
        });
      }

      setMessages(prev => [...prev, ...newMessages]);
      setMessage('');
      setSelectedFiles([]);
      setAudioBlob(null);

      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: generateMessageId() + '_response',
          text: 'Thanks for your message!',
          sender: 'contact',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        }]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
    if (e.target) {
      (e.target as HTMLInputElement).value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = (blob: Blob) => {
    if (audioRef.current) {
      stopAudio();
    }
    
    const audio = new Audio(URL.createObjectURL(blob));
    audioRef.current = audio;
    
    audio.onended = () => setIsPlaying(false);
    audio.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const clearAudioRecording = () => {
    setAudioBlob(null);
    stopAudio();
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase();
    const firstName = contact.firstName?.toLowerCase() || '';
    const lastName = contact.lastName?.toLowerCase() || '';
    const email = contact.email?.toLowerCase() || '';
    
    return (
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      email.includes(searchLower)
    );
  });

  const getInitials = (contact: Contact) => {
    const first = contact.firstName?.[0] || '';
    const last = contact.lastName?.[0] || '';
    return first + last || 'UU';
  };

  const getFullName = (contact: Contact) => {
    return `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown User';
  };

  const getAvatarUrl = (contact: Contact) => {
    if (contact.profilePicture) {
      return contact.profilePicture;
    }
    return `${FALLBACK_AVATAR}${encodeURIComponent(getFullName(contact))}`;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/50 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-xl bg-blue-100/50 hover:bg-blue-200/50 transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-blue-600" />
              </button>
              {adminDetails && (
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {getInitials(adminDetails)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{adminDetails.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white/70 backdrop-blur-sm border-r border-blue-200/50 flex flex-col">
            <div className="p-4 border-b border-blue-200/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-blue-100/50 border border-blue-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingContacts ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="mt-2 text-sm text-gray-500">Loading contacts...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <div className="text-red-500 text-center">
                    <p>Error loading contacts</p>
                    <p className="text-sm mt-2">{error}</p>
                  </div>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-4 border-b border-blue-200/30 cursor-pointer hover:bg-blue-50/50 transition-colors ${
                      selectedContact === contact.id ? 'bg-blue-50/70 border-r-4 border-r-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                          <img 
                            src={getAvatarUrl(contact)}
                            alt={getFullName(contact)}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `${FALLBACK_AVATAR}${encodeURIComponent(getFullName(contact))}`;
                              target.className = "w-full h-full object-cover";
                              target.parentElement!.className = "w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500";
                            }}
                          />
                        </div>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-blue-800 truncate">
                            {getFullName(contact)}
                            {contact.role === 'superadmin' && (
                              <span className="ml-1 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Super</span>
                            )}
                          </h3>
                          <span className="text-xs text-blue-500 flex-shrink-0">{contact.timestamp}</span>
                        </div>
                        <p className="text-sm text-blue-600 truncate mt-1">{contact.email}</p>
                        <p className="text-xs text-gray-500 mt-1">{contact.lastMessage}</p>
                        {contact.notifications && contact.notifications.length > 0 && (
                          <div className="flex items-center mt-1">
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                            <span className="text-xs text-gray-500">
                              {contact.notifications.length} unread notification(s)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {currentContact && (
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 border-b border-blue-600">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-lg">
                      <img 
                        src={getAvatarUrl(currentContact)}
                        alt={getFullName(currentContact)}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `${FALLBACK_AVATAR}${encodeURIComponent(getFullName(currentContact))}`;
                          target.className = "w-full h-full object-cover";
                          target.parentElement!.className = "w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-lg";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{getFullName(currentContact)}</h2>
                    <div className="text-sm opacity-80">
                      {currentContact.isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      onClick={() => setShowChatSearch(!showChatSearch)}
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {showChatSearch && (
                  <div className="mt-3 relative">
                    <input
                      type="text"
                      placeholder="Search in conversation..."
                      value={chatSearchQuery}
                      onChange={(e) => setChatSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 bg-white/20 text-white placeholder:text-white/70 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded"
                      onClick={() => {
                        setShowChatSearch(false);
                        setChatSearchQuery('');
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[70%]">
                    {msg.sender === 'contact' && currentContact && (
                      <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-lg shadow-blue-500/25">
                        <img 
                          src={getAvatarUrl(currentContact)}
                          alt={getFullName(currentContact)}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `${FALLBACK_AVATAR}${encodeURIComponent(getFullName(currentContact))}`;
                            target.className = "w-full h-full object-cover";
                            target.parentElement!.className = "w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-lg shadow-blue-500/25";
                          }}
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-sm shadow-lg shadow-blue-500/25'
                            : 'bg-white text-blue-800 rounded-bl-sm shadow-sm'
                        } ${msg.isTyping ? 'animate-pulse' : ''}`}
                      >
                        {msg.isTyping ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        ) : (
                          <>
                            {msg.type === 'image' && msg.fileUrl && (
                              <img src={msg.fileUrl} alt="Shared image" className="max-w-[200px] rounded-lg mb-2" />
                            )}
                            {msg.type === 'audio' && msg.audioBlob && (
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-1 hover:bg-black/10 rounded"
                                  onClick={() => isPlaying ? stopAudio() : playAudio(msg.audioBlob!)}
                                >
                                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                                <span className="text-sm">Audio message</span>
                              </div>
                            )}
                            {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                            {msg.type === 'file' && msg.fileName && (
                              <div className="flex items-center gap-2 text-sm">
                                <Paperclip className="w-4 h-4" />
                                <span>{msg.fileName}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <p className={`text-xs px-2 ${msg.sender === 'user' ? 'text-right text-blue-500' : 'text-blue-500'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && currentContact && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[70%]">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold shadow-lg shadow-blue-500/25">
                      {currentContact.profilePicture ? (
                        <img 
                          src={currentContact.profilePicture} 
                          alt={getFullName(currentContact)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(currentContact)}</span>
                      )}
                    </div>
                    <div className="bg-white text-blue-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm animate-pulse">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {(selectedFiles.length > 0 || audioBlob) && (
              <div className="p-4 border-t border-blue-200/50 bg-white/70 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-100/50 p-2 rounded-lg border border-blue-200/50">
                      {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-8 h-8 rounded object-cover" />
                      ) : (
                        <Paperclip className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-sm truncate max-w-[100px] text-blue-800">{file.name}</span>
                      <button
                        className="p-1 hover:bg-blue-200/50 rounded"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-3 h-3 text-blue-600" />
                      </button>
                    </div>
                  ))}
                  
                  {audioBlob && (
                    <div className="flex items-center gap-2 bg-blue-100/50 p-2 rounded-lg border border-blue-200/50">
                      <button
                        className="p-1 hover:bg-blue-200/50 rounded"
                        onClick={() => isPlaying ? stopAudio() : playAudio(audioBlob)}
                      >
                        {isPlaying ? <Pause className="w-3 h-3 text-blue-600" /> : <Play className="w-3 h-3 text-blue-600" />}
                      </button>
                      <span className="text-sm text-blue-800">Audio recording</span>
                      <button
                        className="p-1 hover:bg-blue-200/50 rounded"
                        onClick={clearAudioRecording}
                      >
                        <X className="w-3 h-3 text-blue-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-blue-200/50 bg-white/70 backdrop-blur-sm relative">
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-4 z-50">
                  <EmojiPicker 
                    onEmojiClick={(emojiData) => {
                      setMessage(prev => prev + emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                    width={300}
                    height={350}
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-100/50 rounded-lg transition-colors"
                  onClick={handleFileUpload}
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type something..."
                    className="w-full px-4 py-3 pr-20 bg-blue-100/50 border border-blue-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 text-blue-800 placeholder:text-blue-500/70 transition-all duration-200"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button 
                      className="p-1 text-blue-600 hover:bg-blue-100/50 rounded"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    <button 
                      className={`p-1 hover:bg-blue-100/50 rounded ${isRecording ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}
                      onClick={toggleRecording}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={handleSendMessage} 
                  className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim() && selectedFiles.length === 0 && !audioBlob}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Interface;