import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Placeholder components - these will be created in subsequent steps
const Navbar = () => {
  const navLinks = [
    { href: "#menu", label: "Menu" },
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
      <a href="#menu" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg">Scopri il Menù</a>
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
            {items.map(item => (
              <div key={item.name} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-2">{item.name}</h3>
                {item.price && <p className="text-lg text-gray-700 font-bold mb-2">{item.price}</p>}
                {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
                {item.image && <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4"/>}
              </div>
            ))}
          </div>
        ) : (
          // List layout for Sfizi, Insalate, Dolci, Bevande
          <div className="max-w-2xl mx-auto"> {/* Centered list container */}
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.name} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-yellow-700">{item.name}</h3>
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

const BookingForm = () => (
  <section id="prenotazioni" className="py-16 bg-white">
    <div className="w-full px-6"> {/* Changed: Removed container mx-auto px-4, added w-full px-6 */}
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Prenota un Tavolo</h2>
      <form className="max-w-xl mx-auto bg-gray-50 p-8 rounded-lg shadow-xl">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Telefono</label>
          <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Data</label>
            <input type="date" id="date" name="date" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 font-semibold mb-2">Ora</label>
            <input type="time" id="time" name="time" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">Numero Ospiti</label>
          <input type="number" id="guests" name="guests" min="1" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
        </div>
        <div className="mb-6">
          <label htmlFor="requests" className="block text-gray-700 font-semibold mb-2">Richieste Speciali</label>
          <textarea id="requests" name="requests" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
        </div>
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">Invia Prenotazione</button>
      </form>
    </div>
  </section>
);

const AllergenInfo = () => (
  <section id="allergeni" className="py-12 bg-yellow-50">
    <div className="w-full px-6 text-center"> {/* Changed: Removed container mx-auto px-4, added w-full px-6 */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Informazioni Allergeni</h2>
      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
        Si premette che la nostra attività elabora e somministra, utilizzando un’ unico laboratorio e un’unica dispensa, prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.
      </p>
      <a href="#lista-allergeni" className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg">Lista Allergeni Completa</a>
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
        <a href="#privacy" className="hover:text-yellow-400">Privacy & Cookie Policy</a> – Made with love by Sinapps
      </p>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" aria-label="Instagram" className="text-2xl hover:text-yellow-400 transition-colors duration-300">
          {/* Placeholder for Instagram Icon, consider using an SVG or font icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" aria-label="Facebook" className="text-2xl hover:text-yellow-400 transition-colors duration-300">
          {/* Placeholder for Facebook Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Crosta Divina. Tutti i diritti riservati.</p>
    </div>
  </footer>
);


// --- Data for Menu Sections ---
const menuData = {
  pizze: [
    { name: "Margherita", price: "€7.50", description: "Pomodoro San Marzano, mozzarella fior di latte, basilico fresco, olio EVO.", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Diavola", price: "€8.50", description: "Pomodoro San Marzano, mozzarella fior di latte, salame piccante, olio EVO.", image: "https://images.unsplash.com/photo-1604917869287-3ae73c77e227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Capricciosa", price: "€9.50", description: "Pomodoro San Marzano, mozzarella fior di latte, prosciutto cotto, funghi, carciofi, olive.", image: "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Quattro Formaggi", price: "€9.00", description: "Mozzarella fior di latte, gorgonzola, fontina, parmigiano reggiano.", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Vegetariana", price: "€8.50", description: "Pomodoro San Marzano, mozzarella fior di latte, verdure grigliate di stagione.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Prosciutto e Funghi", price: "€9.00", description: "Pomodoro San Marzano, mozzarella fior di latte, prosciutto cotto, funghi freschi.", image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  sfizi: [
    { name: "Arancini di Riso", price: "€3.00/pz", description: "Classici arancini siciliani ripieni di ragù e piselli.", image: "https://images.unsplash.com/photo-1604031840040-960f88f0beaa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bruschetta al Pomodoro", price: "€5.00", description: "Pane casereccio tostato con pomodorini freschi, aglio, basilico e olio EVO.", image: "https://images.unsplash.com/photo-1505253716362-af2422240541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Patatine Fritte", price: "€4.00", description: "Porzione abbondante di patatine fritte croccanti.", image: "https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  insalate: [
    { name: "Insalata Mista", price: "€7.00", description: "Lattuga, rucola, carote, pomodori, cetrioli, mais.", image: "https://images.unsplash.com/photo-1505253716362-af2422240541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, // Generic salad
    { name: "Insalata Caprese", price: "€8.50", description: "Mozzarella di bufala, pomodoro cuore di bue, basilico, origano, olio EVO.", image: "https://images.unsplash.com/photo-1561043433-9265f830ce45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Insalata Greca", price: "€9.00", description: "Pomodori, cetrioli, cipolla rossa, olive Kalamata, feta, origano, olio EVO.", image: "https://images.unsplash.com/photo-1551201582-42585949599c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  dolci: [
    { name: "Tiramisù", price: "€6.00", description: "Classico tiramisù fatto in casa con savoiardi, caffè, mascarpone e cacao.", image: "https://images.unsplash.com/photo-1571877275904-68eb16a7e10d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Panna Cotta", price: "€5.50", description: "Delicata panna cotta con coulis di frutti di bosco.", image: "https://images.unsplash.com/photo-1527153866990-18042ea59742?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cannolo Siciliano", price: "€4.00", description: "Cialda croccante ripiena di ricotta dolce e gocce di cioccolato.", image: "https://images.unsplash.com/photo-1580248326091-99589d75e536?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ],
  bevande: [
    { name: "Acqua Naturale/Frizzante", price: "€2.00", description: "Bottiglia da 0.75L", image: "https://images.unsplash.com/photo-1561041700-533909863515?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Coca Cola / Fanta / Sprite", price: "€3.00", description: "Lattina 33cl", image: "https://images.unsplash.com/photo-1554866585-CD94860890b7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, // Generic soda cans
    { name: "Birra Moretti (bottiglia)", price: "€4.00", description: "Birra italiana classica, 66cl", image: "https://images.unsplash.com/photo-1610022227733-95cf30004580?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, // Beer bottle
    { name: "Vino Rosso della Casa (calice)", price: "€4.50", description: "Selezione del nostro sommelier.", image: "https://images.unsplash.com/photo-1551024709-8f23eda2c5a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, // Glass of red wine
    { name: "Caffè Espresso", price: "€1.50", description: "Autentico espresso italiano.", image: "https://images.unsplash.com/photo-1511920183353-30a4481539e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ]
};

// --- End of Data ---

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main id="menu">
        <MenuSection title="Le Nostre Pizze" items={menuData.pizze} />
        <MenuSection title="Sfizi Golosi" items={menuData.sfizi} />
        <MenuSection title="Insalate Fresche" items={menuData.insalate} />
        <MenuSection title="Dolci Tentazioni" items={menuData.dolci} />
        <MenuSection title="Bevande" items={menuData.bevande} />
      </main>
      <AllergenInfo />
      <BookingForm />
      <LocationMap />
      <Footer />
    </>
  );
}

export default App;
