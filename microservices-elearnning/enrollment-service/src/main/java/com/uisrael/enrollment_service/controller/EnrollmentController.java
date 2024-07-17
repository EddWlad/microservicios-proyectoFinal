package com.uisrael.enrollment_service.controller;

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
		if (Enrollment != null) {
			return ResponseEntity.ok(Enrollment);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@PostMapping()
	public ResponseEntity<Enrollment> createEnrollment(@RequestBody Enrollment enrollment) {
		try {
			Enrollment existingEnrollment = enrollmentservice.obtenerPorId(enrollment.getId());
			Enrollment enrollmentSave = null;

			if (existingEnrollment == null) {
				enrollmentSave = enrollmentservice.create(enrollment);
				return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentSave);
			} else if ("inactive".equals(existingEnrollment.getState())) {
				enrollment.setState("active");
				enrollmentSave = enrollmentservice.update(existingEnrollment.getId(), enrollment);
				return ResponseEntity.status(HttpStatus.CREATED).body(enrollmentSave);
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateEnrollment(@PathVariable String id, @RequestBody Enrollment enrollment) {
		try {
			Enrollment existingEnrollment = enrollmentservice.obtenerPorId(id);

			if (existingEnrollment == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 
			}

			enrollment.setId(id);
			Enrollment updatedEnrollment = enrollmentservice.update(id, enrollment);
			return ResponseEntity.ok(updatedEnrollment);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEnrollment(@PathVariable String id) {
		boolean result = enrollmentservice.delate(id);
		if (result) {
			return ResponseEntity.ok("The enrollment was successfully deleted.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("There was a problem deleting the enrollment.");
		}
	}
}
