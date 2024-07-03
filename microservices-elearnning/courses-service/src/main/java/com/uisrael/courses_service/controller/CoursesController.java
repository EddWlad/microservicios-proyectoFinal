package com.uisrael.courses_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.uisrael.courses_service.entities.Courses;
import com.uisrael.courses_service.service.ICoursesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/courses")
public class CoursesController {
	@Autowired
	private ICoursesService coursesService;

	@GetMapping
	public ResponseEntity<List<Courses>> toListCourses() {
		List<Courses> courses = coursesService.getAll();
		return ResponseEntity.ok(courses);
	}
	
	
    @PostMapping
    public ResponseEntity<Courses> saveCourses(@Valid @RequestBody Courses courses, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        try {
            Courses courseValid = coursesService.searchByName(courses.getName());
            Courses coursesSave = null;
            if (courseValid == null) {
                coursesSave = coursesService.createCourse(courses);
                return ResponseEntity.status(HttpStatus.CREATED).body(coursesSave);
            } else if (courseValid != null && courseValid.getState() == 0) {
                courses.setState(1);
                coursesSave = coursesService.updateCourses(courseValid.getId(), courses);
                return ResponseEntity.status(HttpStatus.CREATED).body(coursesSave);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Conflict for existing course
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
	
    @GetMapping("/{id}")
    public ResponseEntity<Courses> getCourse(@PathVariable String id) {
        Courses course = coursesService.getById(id);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
	
    @PutMapping("/{id}")
    public ResponseEntity<?> editCourse(@Valid @PathVariable String id, @Valid @RequestBody Courses courses, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getFieldError().getDefaultMessage());
        }
        
        try {
            Courses courseValid = coursesService.searchByName(courses.getName());
            if (courseValid == null || courseValid.getId().equals(id)) {
                coursesService.updateCourses(id, courses);
                return ResponseEntity.ok("Course edit success");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Courses already exist.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

	
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable String id) {
        boolean result = coursesService.deleteCourses(id);
        if (result) {
            return ResponseEntity.ok("The course was successfully deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There was a problem deleting the course.");
        }
    }

}
