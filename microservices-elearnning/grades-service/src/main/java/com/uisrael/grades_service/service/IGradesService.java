package com.uisrael.grades_service.service;

import java.util.List;
import java.util.Optional;

import com.uisrael.grades_service.entities.Grades;

public interface IGradesService {
	List<Grades> getAll();
	Grades getById(String id);
	Optional<Grades> searchById(String id);
	Grades createGrades(Grades grades);
	Grades updateGrades(String id, Grades grades);
	public boolean deleteGrades(String id);
	
	Grades searchByGrade(double grade);
}
