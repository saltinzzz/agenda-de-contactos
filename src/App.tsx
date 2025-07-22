import { useState, useEffect } from 'react'
import { Contact } from './types/Contact.tsx'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

const defaultContacts: Contact[] = [
  { id: '1', nombre: 'Juan', apellido: 'Pérez', telefono: '912345678', email: 'juanperez@gmail.com' },
  { id: '2', nombre: 'Ana', apellido: 'Gómez', telefono: '923456789', email: 'anagomez@gmail.com' }
]

function App() {
const [contacts, setContacts] = useState<Contact[]>(() => {
    const stored = localStorage.getItem('contacts')
    return stored ? JSON.parse(stored) : defaultContacts
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    }
    setContacts([...contacts, newContact])
  }

  const handleDeleteContact = (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este contacto?');
    if (confirmDelete) {
    setContacts(contacts.filter(contact => contact.id !== id));
  }
};

const handleEditContact = (contact: Contact) => {
  setEditingContact(contact);
};

const handleUpdateContact = (updatedContact: Contact) => {
  setContacts(prev =>
    prev.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    )
  );
  setEditingContact(null);
};

  const filteredContacts = contacts.filter((contact) =>
  [contact.nombre, contact.apellido, contact.email, contact.telefono]
    .some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <ThemeToggle />
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Agregar Contacto</h2>
          <ContactForm 
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancelEdit={() => setEditingContact(null)}
          />
        </section>

        <section className="contacts-section">
          <h2>Lista de Contactos</h2>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ContactList 
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </section>
      </main>
       <footer className="app-footer">
      <p>© 2025 Agenda de Contactos - Stalin Gonzales</p>
        </footer>
    </div>
  )
  
}

export default App
