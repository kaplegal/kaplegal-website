/**
 * Reusable CRUD helper functions to reduce code duplication
 */

/**
 * Generic delete handler
 * @param {Model} Model - Mongoose model
 * @param {string} itemName - Name of the item for error messages
 */
const deleteItem = (Model, itemName = 'Item') => {
  return async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: `${itemName} not found` });
      }
      
      await Model.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: `${itemName} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${itemName.toLowerCase()}`, error: error.message });
    }
  };
};

/**
 * Generic get by ID handler
 * @param {Model} Model - Mongoose model
 * @param {string} itemName - Name of the item for error messages
 * @param {string} selectFields - Fields to select (optional)
 */
const getItemById = (Model, itemName = 'Item', selectFields = null) => {
  return async (req, res) => {
    try {
      let query = Model.findById(req.params.id);
      if (selectFields) {
        query = query.select(selectFields);
      }
      
      const item = await query;
      if (!item) {
        return res.status(404).json({ message: `${itemName} not found` });
      }
      
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${itemName.toLowerCase()}`, error: error.message });
    }
  };
};

/**
 * Generic get all handler
 * @param {Model} Model - Mongoose model
 * @param {string} itemName - Name of the item for error messages
 * @param {object} filter - Filter object (optional)
 * @param {string} sortField - Field to sort by (optional)
 */
const getAllItems = (Model, itemName = 'Items', filter = {}, sortField = 'createdAt') => {
  return async (req, res) => {
    try {
      const items = await Model.find(filter).sort({ [sortField]: -1 });
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${itemName.toLowerCase()}`, error: error.message });
    }
  };
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Middleware to validate ObjectId parameter
 */
const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

module.exports = {
  deleteItem,
  getItemById,
  getAllItems,
  isValidObjectId,
  validateObjectId
};
