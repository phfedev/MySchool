// const Course = require('../models/Course');

class CoursesController {
  async store(req, res) {
    return res.json({ command: 'storeCourse' });
  }

  async update(req, res) {
    return res.json({ command: 'updateCourse' });
  }
}

module.exports = new CoursesController();
