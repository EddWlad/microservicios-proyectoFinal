package com.uisrael.enrollment_service.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uisrael.enrollment_service.entity.Enrollment;
import com.uisrael.enrollment_service.repository.IEnrollmentRepository;
import com.uisrael.enrollment_service.service.IEnrollmentService;

@Service
public class EnrollmentServiceImpl implements IEnrollmentService {

	@Autowired
	private IEnrollmentRepository repo;

	@Override
	public Enrollment obtenerPorId(String id) {
		return repo.findById(id).orElse(null);
	}

	@Override
	public Enrollment create(Enrollment enrollment) {
		return repo.save(enrollment);
	}

	@Override

	public Enrollment update(String id, Enrollment enrollment) {
        enrollment.setId(id);
        return repo.save(enrollment);
    }
	@Override

	public List<Enrollment> listenrollment() {
		return repo.findAll();
	}

	@Override
	public boolean delate(String id) {
		Enrollment enrollment = repo.findById(id).orElse(null);
		if (enrollment != null) {
			repo.delete(enrollment);
			return true;
		} else {
			return false;
		}
	}

}
