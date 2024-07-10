package com.uisrael.enrollment_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.uisrael.enrollment_service.entity.Enrollment;
import com.uisrael.enrollment_service.service.IEnrollmentService;


@Controller
@RequestMapping("enrollment")
public class EnrollmentController {
	@Autowired
	private IEnrollmentService enrollmentservice;

	@GetMapping
	@ResponseBody
	public List<Enrollment> listEnrollment() {
		List<Enrollment> Enrollments = enrollmentservice.listenrollment();
		return Enrollments;
	}

	@GetMapping("/{id}")
	@ResponseBody
	public Enrollment getEnrollment(@PathVariable String id) {
		Enrollment Enrollment = enrollmentservice.obtenerPorId(id);
		return Enrollment;
	}

	@PostMapping()
	@ResponseBody
	public Enrollment createEnrollment(@RequestBody Enrollment Enrollment) {
		return enrollmentservice.create(Enrollment);
	}

	@PutMapping("/{id}")
	@ResponseBody
	public Enrollment updateEnrollment(@PathVariable String id, @RequestBody Enrollment Enrollment) {
		Enrollment EnrollmentDb = enrollmentservice.obtenerPorId(id);
		if (EnrollmentDb != null) {
			EnrollmentDb.setIduser(Enrollment.getIduser());
			EnrollmentDb.setIdcourse(Enrollment.getIdcourse());
			EnrollmentDb.setState(Enrollment.getState());
			EnrollmentDb.setDescription(Enrollment.getDescription());
			EnrollmentDb.setCreationdate(Enrollment.getCreationdate());
		}

		return enrollmentservice.update(EnrollmentDb);
	}

	@DeleteMapping("/{id}")
	@ResponseBody
	public void deleteEnrollment(@PathVariable String id) {
		enrollmentservice.delate(id);
	}
}
