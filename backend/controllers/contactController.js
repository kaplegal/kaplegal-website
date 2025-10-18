const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

// Submit a new contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject and message are required' });
    }
    
    const newContact = new Contact({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });
    
    const savedContact = await newContact.save();
    
    // Send email notification
    try {
      await emailService.sendContactNotification({
        name,
        email,
        phone,
        subject,
        message
      });
      console.log('Email notification sent for contact:', savedContact._id);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // We don't want to fail the API response if just the email fails
      // The contact is still saved in the database
    }
    
    res.status(201).json({ 
      message: 'Your message has been sent successfully. We will contact you shortly.',
      id: savedContact._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
};

// Get all contact submissions (admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

// Get a single contact submission
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // If status is 'new', update to 'read'
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    contact.status = status;
    const updatedContact = await contact.save();
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact status', error: error.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};
