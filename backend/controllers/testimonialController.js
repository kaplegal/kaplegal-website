const Testimonial = require('../models/Testimonial');

// Get all testimonials (public)
exports.getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};

// Get all testimonials (admin)
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};

// Get a single testimonial
exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonial', error: error.message });
  }
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, position, text } = req.body;
    
    if (!name || !position || !text) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const newTestimonial = new Testimonial({
      name,
      position,
      text
    });
    
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  }
};

// Update a testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const { name, position, text, isActive } = req.body;
    
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    testimonial.name = name || testimonial.name;
    testimonial.position = position || testimonial.position;
    testimonial.text = text || testimonial.text;
    
    // Only update isActive if it's explicitly provided
    if (isActive !== undefined) {
      testimonial.isActive = isActive;
    }
    
    const updatedTestimonial = await testimonial.save();
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error: error.message });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
};
