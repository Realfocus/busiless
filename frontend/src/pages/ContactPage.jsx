import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SimpleMessageList from '../components/MessageList';

const URL = import.meta.env.VITE_SERVER

const ContactForm = () => {
  const [supervisors, setSupervisors] = useState([])
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      // Show success toast notification
      toast.success('Message sent successfully!', {
        duration: 3000,
        position: 'top-center'
      });

      // Reset form after successful submission
      setFormData({ sender: '', receiver: '', message: '' });
    } catch (error) {
      // Show error toast notification
      toast.error(error.message || 'Failed to send message', {
        duration: 4000,
        position: 'top-center'
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await fetch(`${URL}/supervisors`);
        const data = await response.json();
        setSupervisors(data.supervisors);
        // console.log(data.supervisors);
      } catch (err) {
        prompt(err.message);
      }
    };

    fetchSupervisors();
  }, []);


  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 '>
        <SimpleMessageList />
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="sender"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="sender"
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="receiver"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Recipient
              </label>
              <select
                id="receiver"
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {supervisors.map((supervisor) => (

                  <option key={supervisor.email} value={supervisor.email}>
                    {supervisor.fullName}
                  </option>))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </section>
    </>
  );
};

export default ContactForm;
