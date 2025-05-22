import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import margheritaImage from './assets/images/margherita.jpeg'; // Import the local image
import diavolaImage from './assets/images/diavola.jpeg'; // Import for Diavola
import kebabImage from './assets/images/kebab.jpeg'; // Import for Kebab
import quattroFormaggiImage from './assets/images/4formaggi.jpeg';
import capricciosaImage from './assets/images/capricciosa.jpeg';
import prosciuttoFunghiImage from './assets/images/prosciuttofunghi.jpeg';
import vegetarianaImage from './assets/images/vegetariana.jpeg';
import americanaImage from './assets/images/americana.jpeg';
import marinaraImage from './assets/images/marinara.jpeg';

// Supabase configuration
const supabaseUrl = 'https://gpkzkiivbxmwjsbbofts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwa3praWl2Ynhtd2pzYmJvZnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MDgwNTAsImV4cCI6MjA2MzQ4NDA1MH0.Ij0P4b8IA9hBFQm0_mKUpBzKDOekjyplmip2DpWMG1Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Placeholder components - these will be created in subsequent steps
const Navbar = () => {
  const navLinks = [
    { href: "#le-nostre-pizze", label: "Menu" }, // Changed href to point to the pizza section
    { href: "#prenotazioni", label: "Prenota" },
    { href: "#dove-siamo", label: "Dove Siamo" },
    { href: "#allergeni", label: "Allergeni" },
  ];

  return (
    <nav className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200 italic">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-4xl font-bold hover:text-pizza-red">Crosta Divina</a>
        <div className="space-x-4">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="hover:text-pizza-red transition-colors duration-300">{link.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
    {/* Changed: Removed container mx-auto. Existing p-8 provides padding. */}
    <div className="w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-8">
      <h1 className="text-5xl font-bold mb-4">Benvenuti a Crosta Divina</h1>
      <p className="text-xl mb-8">Autentica pizza italiana, con amore.</p>
      <a href="#le-nostre-pizze" className="bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg">Scopri il Menù</a> {/* Changed href */}
    </div>
  </section>
);

const MenuSection = ({ title, items }) => {
  // Determine if the current section is for pizzas or other items
  const isPizzaSection = title === 'Le Nostre Pizze';

  return (
    <section id={title.toLowerCase().replace(/\s+/g, '-')} className={`py-16 ${isPizzaSection ? 'bg-gray-100' : 'bg-white'}`}> {/* Pizzas on gray-100, others on white */}
      <div className="w-full px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">{title}</h2>
        {isPizzaSection ? (
          // Grid layout for Pizzas
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => {
              // Determine the image source
              let imageUrl = item.photoName; // Default to Supabase URL
              if (item.name === "Margherita") {
                imageUrl = margheritaImage; // Use local import for Margherita
              } else if (item.name === "Diavola") {
                imageUrl = diavolaImage; // Use local import for Diavola
              } else if (item.name === "Kebab") {
                imageUrl = kebabImage; // Use local import for Kebab
              } else if (item.name === "Capricciosa") {
                imageUrl = capricciosaImage;
              } else if (item.name === "Quattro Formaggi") {
                imageUrl = quattroFormaggiImage;
              } else if (item.name === "Prosciutto e Funghi") {
                imageUrl = prosciuttoFunghiImage;
              } else if (item.name === "Vegetariana") {
                imageUrl = vegetarianaImage;
              } else if (item.name === "Americana") {
                imageUrl = americanaImage;
              } else if (item.name === "Marinara") {
                imageUrl = marinaraImage;
              }

              return (
                <div key={item.name} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold text-red-600 mb-2">{item.name}</h3>
                  {item.price && <p className="text-lg text-gray-700 font-bold mb-2">€{item.price.toFixed(2)}</p>}
                  {item.ingredients && <p className="text-gray-600 mb-4">{item.ingredients}</p>}
                  {imageUrl && <img src={imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4"/>}
                </div>
              );
            })}
          </div>
        ) : (
          // List layout for Sfizi, Insalate, Dolci, Bevande
          <div className="max-w-2xl mx-auto"> {/* Centered list container */}
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.name} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-red-700">{item.name}</h3>
                    {item.price && <p className="text-md text-gray-800 font-semibold">{item.price}</p>}
                  </div>
                  {item.description && <p className="text-gray-600 mt-1 text-sm">{item.description}</p>}
                  {/* No image for non-pizza items */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Basic validation (can be expanded)
    if (!name || !email || !phone || !reservationDate || !reservationTime || numberOfGuests < 1) {
      setSubmissionStatus('error');
      alert('Per favore, compila tutti i campi obbligatori.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('prenotazioni')
        .insert([{ 
          name, 
          email, 
          phone, 
          reservation_date: reservationDate, 
          reservation_time: reservationTime, 
          number_of_guests: parseInt(numberOfGuests, 10), 
          special_requests: specialRequests 
        }]);

      if (error) {
        throw error;
      }

      setSubmissionStatus('success');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setReservationDate('');
      setReservationTime('');
      setNumberOfGuests(1);
      setSpecialRequests('');
      alert('Prenotazione inviata con successo!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmissionStatus('error');
      alert("Si è verificato un errore durante l'invio della prenotazione. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="prenotazioni" className="py-16 bg-white">
      <div className="w-full px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Prenota un Tavolo</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nome</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Telefono</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Data (gg/mm/aaaa)</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                required 
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">Ora (--:--)</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
                required 
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">Numero Ospiti</label>
            <input 
              type="number" 
              id="guests" 
              name="guests" 
              min="1" 
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="requests" className="block text-gray-700 font-semibold mb-2">Richieste Speciali</label>
            <textarea 
              id="requests" 
              name="requests" 
              rows="4" 
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600 text-gray-100 font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia Prenotazione'}
          </button>
          {submissionStatus === 'success' && (
            <p className="mt-4 text-green-600 text-center">Prenotazione inviata con successo!</p>
          )}
          {submissionStatus === 'error' && (
            <p className="mt-4 text-red-600 text-center">Si è verificato un errore. Riprova.</p>
          )}
        </form>
      </div>
    </section>
  );
};

// Define allergen data
const allergens = [
  { name: "Glutine", description: "Presente in cereali come grano, orzo, segale, farro, kamut." },
  { name: "Crostacei", description: "Gamberi, granchi, aragoste, scampi e prodotti derivati." },
  { name: "Uova", description: "Uova e prodotti a base di uova." },
  { name: "Pesce", description: "Pesce e prodotti a base di pesce, tranne gelatina di pesce." },
  { name: "Arachidi", description: "Arachidi e prodotti a base di arachidi." },
  { name: "Soia", description: "Soia e prodotti a base di soia." },
  { name: "Latte", description: "Latte e prodotti a base di latte (incluso lattosio)." },
  { name: "Frutta a guscio", description: "Mandorle, nocciole, noci, anacardi, pistacchi, ecc." },
  { name: "Sedano", description: "Sedano e prodotti a base di sedano." },
  { name: "Senape", description: "Senape e prodotti a base di senape." },
  { name: "Semi di sesamo", description: "Semi di sesamo e prodotti a base di semi di sesamo." },
  { name: "Anidride solforosa e solfiti", description: "In concentrazioni superiori a 10 mg/kg o 10 mg/litro." },
  { name: "Lupini", description: "Lupini e prodotti a base di lupini." },
  { name: "Molluschi", description: "Vongole, cozze, calamari, polpi e prodotti derivati." }
];

// AllergenModal Component
const AllergenModal = ({ isOpen, onClose, allergensList }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
        <div className="bg-red-500 text-gray-900 p-4 flex justify-between items-center rounded-t-lg">
          <h3 className="font-semibold text-xl">Lista Allergeni Completa</h3>
          <button onClick={onClose} className="text-gray-900 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <ul className="space-y-3">
            {allergensList.map(allergen => (
              <li key={allergen.name} className="border-b pb-2">
                <strong className="text-red-700">{allergen.name}:</strong>
                <p className="text-gray-600 text-sm">{allergen.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};


const AllergenInfo = ({ onOpenModal }) => (
  <section id="allergeni" className="py-12 bg-red-50"> {/* Changed background to a light red */}
    <div className="w-full px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Informazioni Allergeni</h2>
      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
        Si premette che la nostra attività elabora e somministra, utilizzando un’ unico laboratorio e un’unica dispensa, prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.
      </p>
      <button
        onClick={onOpenModal}
        className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-2 px-4 rounded-lg"
      >
        Lista Allergeni Completa
      </button>
    </div>
  </section>
);

const LocationMap = () => (
  <section id="dove-siamo" className="py-16 bg-gray-100">
    <div className="w-full px-6"> {/* Changed: Removed container mx-auto px-4, added w-full px-6 */}
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Dove Siamo</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Crosta Divina</h3>
          <p className="text-lg text-gray-600 mb-2">Milano Via Pigna 12</p>
          <p className="text-lg text-gray-600 mb-4">Telefono: 02 2047777</p>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Orari di Apertura:</h4>
          <p className="text-gray-600">Lun-Ven: 12.30 – 14.40 / 19.30 – 23.30</p>
          <p className="text-gray-600">Sab-Dom: 12.30 – 15.00 / 19.30 – 23.45</p>
        </div>
        <div className="h-96 rounded-lg shadow-xl overflow-hidden">
          {/* Replace with actual Google Maps embed code */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.4004990000003!2d9.188542315509636!3d45.46542297910025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c6a7d1c0b1f%3A0x1b2d9b8b0f0b1b2d!2sVia%20Pigna%2C%2012%2C%2020121%20Milano%20MI%2C%20Italy!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border:0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location of Crosta Divina"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="w-full px-6 text-center"> {/* Changed: Removed container mx-auto px-4, added w-full px-6 */}
      <p className="mb-4">Pizzalovers SRL Via Cadore, 26 | 20135 Milano MI | Partita IVA: 09242710007</p>
      <p className="mb-4">
        <a href="#privacy" className="hover:text-red-400">Privacy & Cookie Policy</a> – Made with love by Sinapps
      </p>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" aria-label="Instagram" className="text-2xl hover:text-red-400 transition-colors duration-300">
          {/* Placeholder for Instagram Icon, consider using an SVG or font icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" aria-label="Facebook" className="text-2xl hover:text-red-400 transition-colors duration-300">
          {/* Placeholder for Facebook Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Crosta Divina. Tutti i diritti riservati.</p>
    </div>
  </footer>
);

// ChatWindow Component
const ChatWindow = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-50">
      <div className="bg-red-500 text-gray-900 p-3 flex justify-between items-center rounded-t-lg">
        <h3 className="font-semibold">Chat with Support</h3>
        <button onClick={onClose} className="text-gray-900 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {/* Placeholder for messages */}
        <div className="mb-2 text-sm">
          <p className="bg-gray-200 text-gray-800 rounded-lg py-2 px-3 inline-block">Hello! How can I help you today?</p>
        </div>
        <div className="mb-2 text-sm text-right">
          <p className="bg-red-500 text-white rounded-lg py-2 px-3 inline-block">I have a question about my order.</p> {/* User message bubble */}
        </div>
      </div>
      <div className="p-3 border-t border-gray-200">
        <input type="text" placeholder="Type your message..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
      </div>
    </div>
  );
};

// Chatbot Button Component
const ChatbotButton = ({ onClick }) => (
  <button
    onClick={onClick} // Use passed onClick handler
    className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-gray-900 font-bold p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 z-50"
    aria-label="Chat with bot"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
    </svg>
  </button>
);

const App = () => {
  const [menuPizzas, setMenuPizzas] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat window
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false); // State for allergen modal

  // Keep other menu sections if they are static or fetched differently
  const [menuSfizi] = useState([
    { name: "Arancini di Riso", price: "€3.00/pz", description: "Classici arancini siciliani ripieni di ragù e piselli.", image: "https://images.unsplash.com/photo-1604031840040-960f88f0beaa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bruschetta al Pomodoro", price: "€5.00", description: "Pane casereccio tostato con pomodorini freschi, aglio, basilico e olio EVO.", image: "https://images.unsplash.com/photo-1505253716362-af2422240541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]);
  const [menuInsalate] = useState([
    { name: "Insalata Caprese", price: "€7.00", description: "Mozzarella di bufala, pomodoro cuore di bue, basilico fresco, olio EVO.", image: "https://plus.unsplash.com/premium_photo-1673809798491-9d5999006043?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Insalata Mista", price: "€6.50", description: "Lattuga, rucola, carote, pomodorini, mais, cetrioli, olive.", image: "https://images.unsplash.com/photo-1505253716362-af2422240541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]);
  const [menuDolci] = useState([
    { name: "Tiramisù", price: "€5.50", description: "Classico tiramisù fatto in casa con savoiardi, caffè, mascarpone e cacao.", image: "https://images.unsplash.com/photo-1571877275904-68eb16a7e10d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Panna Cotta", price: "€5.00", description: "Delicata panna cotta con coulis di frutti di bosco.", image: "https://images.unsplash.com/photo-1567742035379-9f90d0f7973e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]);
  const [menuBevande] = useState([
    { name: "Acqua Naturale/Frizzante", price: "€2.00", description: "Bottiglia da 0.75L" },
    { name: "Coca Cola / Fanta / Sprite", price: "€3.00", description: "Lattina da 33cl" },
    { name: "Birra Artigianale Bionda", price: "€5.00", description: "Bottiglia da 33cl" },
    { name: "Vino Rosso della Casa", price: "€4.00/calice", description: "Selezione del giorno" },
  ]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*');
      if (error) {
        console.error('Error fetching pizzas:', error);
      } else {
        setMenuPizzas(data);
      }
    };
    fetchPizzas();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <MenuSection title="Le Nostre Pizze" items={menuPizzas} />
      <MenuSection title="Sfizi" items={menuSfizi} />
      <MenuSection title="Insalate" items={menuInsalate} />
      <MenuSection title="Dolci" items={menuDolci} />
      <MenuSection title="Bevande" items={menuBevande} />
      <BookingForm />
      <AllergenInfo onOpenModal={() => setIsAllergenModalOpen(true)} />
      <LocationMap />
      <Footer />
      <ChatbotButton onClick={() => setIsChatOpen(prev => !prev)} /> {/* Toggle chat window */}
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> {/* Pass state and close handler */}
      <AllergenModal
        isOpen={isAllergenModalOpen}
        onClose={() => setIsAllergenModalOpen(false)}
        allergensList={allergens}
      />
    </>
  );
};

export default App;
