"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _conn = _interopRequireDefault(require("../db/conn.js"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router();
router.get("/", function _callee(req, res) {
  var gradesCollection, grades;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_conn["default"].collection("grades"));

        case 3:
          gradesCollection = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(gradesCollection.find().limit(10).toArray());

        case 6:
          grades = _context.sent;
          // sending back the json data
          res.json({
            grades: grades
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
/**
 * GET /id
 * @description Return a grade document by id
 */

router.get("/:id", function _callee2(req, res) {
  var id, gradesCollection, grade;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id; // select the collection to use

          _context2.next = 3;
          return regeneratorRuntime.awrap(_conn["default"].collection("grades"));

        case 3:
          gradesCollection = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(gradesCollection.findOne({
            _id: _mongodb.ObjectId.createFromHexString(id)
          }));

        case 6:
          grade = _context2.sent;

          // if grade not found
          if (!grade) {
            res.status(404).json({
              error: "Grade with id: ".concat(id, " Not Found")
            });
          } else {
            // sending back the json data
            res.json({
              grade: grade
            });
          }

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/**
 * GET /student/:id
 */

router.get("/student/:id", function _callee3(req, res) {
  var id, gradesCollection, studentGrades;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id; // select the collection to use

          _context3.next = 3;
          return regeneratorRuntime.awrap(_conn["default"].collection("grades"));

        case 3:
          gradesCollection = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(gradesCollection.find({
            learner_id: Number(id)
          }).toArray());

        case 6:
          studentGrades = _context3.sent;
          res.json({
            studentGrades: studentGrades
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/**
 * GET /class/:id
 */

router.get("/class/:id", function _callee4(req, res) {
  var id, gradesCollection, gradesByClassId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id; // select the collection to use

          _context4.next = 3;
          return regeneratorRuntime.awrap(_conn["default"].collection("grades"));

        case 3:
          gradesCollection = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(gradesCollection.find({
            class_id: Number(id)
          }).toArray());

        case 6:
          gradesByClassId = _context4.sent;

          if (!gradesByClassId) {
            res.status(404).json({
              error: "Class id ".concat(id, " Not Found")
            });
          } else {
            res.json({
              grades: gradesByClassId
            });
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Create a single grade entry

router.post("/", function _callee5(req, res) {
  var collection, newDocument, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_conn["default"].collection("grades"));

        case 2:
          collection = _context5.sent;
          newDocument = req.body; // rename fields for backwards compatibility

          if (newDocument.student_id) {
            newDocument.learner_id = newDocument.student_id;
            delete newDocument.student_id;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(collection.insertOne(newDocument));

        case 7:
          result = _context5.sent;
          res.send(result).status(204);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;