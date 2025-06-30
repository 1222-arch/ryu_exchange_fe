import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useAuth } from 'src/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { fetchEvents } from 'src/services/eventService';
import { useTranslation } from 'react-i18next';

const EventPage = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setLoadingEvents(true);
      setFetchError(null);
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setFetchError(t('errorLoadingEvents'));
      } finally {
        setLoadingEvents(false);
      }
    };
    loadEvents();
  }, [t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        'service_zevpm3w',
        'template_kvd2a3q',

        {
          title,
          description,
          sender_email: senderEmail || t('notProvided'),
        },
        '8PR-lKPFNOcjDqW2T'
      );

      alert(t('eventSubmittedSuccess'));
      setTitle('');
      setDescription('');
      setSenderEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('errorPosting'));
    } finally {
      setSending(false);
    }
  };

  const formatDate = (timestamp) => {
    try {
      if (!timestamp || !timestamp.toDate) return t('timeNotSpecified');
      return timestamp.toDate().toLocaleString();
    } catch {
      return t('invalidDate');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {isAdmin && (
        <div className="mb-4">
          <Link
            to="/event/create"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + {t('createEvent')}
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-8">
        <h2 className="text-2xl font-bold mb-4">{t('newEventSuggestions')}</h2>

        <label className="block font-semibold mb-1">{t('eventTitle')}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          required
          disabled={sending}
        />

        <label className="block font-semibold mb-1">{t('eventDescription')}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          rows={4}
          required
          disabled={sending}
        />

        <label className="block font-semibold mb-1">{t('contactEmailOptional')}</label>
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          placeholder="abc@example.com"
          disabled={sending}
        />

        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            sending ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={sending}
        >
          {sending ? t('sending') : t('sendToAdmin')}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">{t('eventPosted')}</h2>

        {loadingEvents && <p>{t('loadingEvents')}</p>}
        {fetchError && <p className="text-red-600">{fetchError}</p>}

        {!loadingEvents && !fetchError && (
          <>
            {events.length === 0 ? (
              <p className="text-gray-500">{t('noEventsYet')}</p>
            ) : (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.id} className="border p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p>{event.description}</p>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(event.createdAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventPage;
