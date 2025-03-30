import React, { useState, useEffect } from 'react';

const URL = import.meta.env.VITE_SERVER

const SimpleMessageList = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${URL}/messages`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
          setFilteredMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Filter messages when filterEmail changes
  useEffect(() => {
    if (!filterEmail.trim()) {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(
        msg =>
          msg.sender.toLowerCase().includes(filterEmail.toLowerCase()) ||
          msg.receiver.toLowerCase().includes(filterEmail.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [filterEmail, messages]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>

      {/* Email filter input */}
      <div className="mb-4">
        <input
          type="text"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          placeholder="Filter by email..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Message list */}
      {filteredMessages.length > 0 ? (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="border rounded p-3 bg-white shadow-sm">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <div>
                  <span className="font-medium">From:</span> {msg.sender || 'Unknown'}
                </div>
                <div>
                  <span className="font-medium">To:</span> {msg.receiver || 'Unknown'}
                </div>
              </div>
              <p className="py-2">{msg.message}</p>
              <p className="text-xs text-gray-500 text-right">
                {formatDate(msg.createdAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No messages found matching "{filterEmail}"
        </div>
      )}
    </div>
  );
};

export default SimpleMessageList;
