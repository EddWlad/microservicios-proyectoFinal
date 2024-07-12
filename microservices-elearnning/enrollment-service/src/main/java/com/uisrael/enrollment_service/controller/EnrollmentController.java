package com.uisrael.enrollment_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uisrael.enrollment_service.entity.Enrollment;
import com.uisrael.enrollment_service.service.IEnrollmentService;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {
	@Autowired
	private IEnrollmentService enrollmentservice;

	@GetMapping
	public ResponseEntity<List<Enrollment>> listEnrollment() {
		List<Enrollment> Enrollments = enrollmentservice.listenrollment();
		return ResponseEntity.ok(Enrollments);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Enrollment> getEnrollment(@PathVariable String id) {
		Enrollment Enrollment = enrollmentservice.obtenerPorId(id);
		if(Enrollment !=null) {
			return ResponseEntity.ok(Enrollment);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@PostMapping()
	public ResponseEntity<Enrollment> createEnrollment(@RequestBody Enrollment Enrollment) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateEnrollment(@PathVariable String id, @RequestBody Enrollment enrollment) {
		 try {
	            Enrollment enrollmentupdate  = enrollmentservice.obtenerPorId(id);
	            
	            if (enrollmentupdate != null) {
	                enrollmentservice.update(id, enrollmentupdate);
	                return ResponseEntity.ok("Enrollment updated successfully");
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEnrollment(@PathVariable String id) {
			boolean result = enrollmentservice.delate(id);
        if (result) {
            return ResponseEntity.ok("The enrollment was successfully deleted.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There was a problem deleting the course.");
        }
	}
}
