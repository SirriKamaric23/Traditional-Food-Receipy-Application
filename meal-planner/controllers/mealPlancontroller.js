const MealPlan = require

// Create a new meal plan
exports.createMealPlan = async (req, res) => {
  try {
    // Validate required fields (example: userId and meals)
    if (!req.body.userId || !req.body.meals) {
      return res.status(400).json({ error: 'userId and meals are required.' });
    }
    const mealPlan = new MealPlan(req.body);
    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all meal plans for a user
exports.getMealPlans = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: 'userId parameter is required.' });
    }
    const plans = await MealPlan.find({ userId: req.params.userId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a meal plan
exports.updateMealPlan = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Meal plan id parameter is required.' });
    }
    const updated = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a meal plan
exports.deleteMealPlan = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Meal plan id parameter is required.' });
    }
    const deleted = await MealPlan.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    res.json({ message: 'Meal plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};