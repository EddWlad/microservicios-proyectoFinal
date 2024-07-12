package com.uisrael.enrollment_service.service;

import java.util.List;

import com.uisrael.enrollment_service.entity.Enrollment;


public interface IEnrollmentService  {
	
	Enrollment obtenerPorId(String id);
	Enrollment create(Enrollment enrollment);
	Enrollment update (String id, Enrollment enrollment);
	public boolean delate(String Id);
	List <Enrollment> listenrollment();

}
