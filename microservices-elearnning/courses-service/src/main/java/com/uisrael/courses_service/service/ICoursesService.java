package com.uisrael.courses_service.service;

import java.util.List;
import java.util.Optional;

import com.uisrael.courses_service.entities.Courses;



public interface ICoursesService {
	List<Courses> getAll();
	Courses getById(String id);
	Optional<Courses> searchById(String id);
	Courses createCourse(Courses courses);
	Courses updateCourses(String id, Courses courses);
	public boolean deleteCourses(String id);
	Long countCourses();
	
	Courses searchByName(String nombre);
}
