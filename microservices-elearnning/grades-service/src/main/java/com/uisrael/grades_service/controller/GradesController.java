package com.uisrael.grades_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uisrael.grades_service.entities.Grades;
import com.uisrael.grades_service.service.IGradesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/grades")
public class GradesController {
	@Autowired
	private IGradesService gradesService;
	
	@GetMapping
	public ResponseEntity<List<Grades>> toListGrades(){
		List<Grades> grades = gradesService.getAll();
		return ResponseEntity.ok(grades);
	}
	
	@PostMapping
	public ResponseEntity<Grades> saveGrades(@Valid @RequestBody Grades grades, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		
		try {
			Grades gradesValid = gradesService.searchByGrade(grades.getGrade());
			Grades gradesSave = null;
			if (gradesValid == null) {
				gradesSave = gradesService.createGrades(grades);
				return ResponseEntity.status(HttpStatus.CREATED).body(gradesSave);
			}else if (gradesValid != null && gradesValid.getState() == 0) {
				grades.setState(1);
				gradesSave = gradesService.updateGrades(gradesValid.getId(), grades);
				return ResponseEntity.status(HttpStatus.CREATED).body(gradesSave);
			}else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Conflict for existing course
            }
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> editGrade(@Valid @PathVariable String id, @Valid @RequestBody Grades grades, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getFieldError().getDefaultMessage());
		}
		
		try {
			Grades gradesValid = gradesService.searchByGrade(grades.getGrade());
			if (gradesValid == null || gradesValid.getId().equals(id)) {
				gradesService.updateGrades(id, grades);
				return ResponseEntity.ok("Grades edit success");
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("Grades already exist.");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteGrades(@PathVariable String id){
		boolean result = gradesService.deleteGrades(id);
		if (result) {
			return ResponseEntity.ok("The grades was successfully deleted.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There was a problem deleting the grades.");
		}
	}
}
